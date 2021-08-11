import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { LdapCreateRemoteIdp } from '@sp-proxy/interface-adapters/data/LdapCreateRemoteIdp'
import { makeLdapClientMock } from '@sp-proxy/interface-adapters/data/mocks/makeLdapClientMock.mock'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { randomUUID } from 'crypto'
import * as ldapjs from 'ldapjs'
import * as cfg from '../data/config/env'

const ldapCfg = cfg.default.database.ldap

interface SutTypes {
  sut: LdapCreateRemoteIdp
  clientStub: ldapjs.Client
  dnStub: string
}

const fakeDn = `${ldapCfg.names.remoteIdpsOu},${ldapCfg.names.inboundSamlOu},${ldapCfg.names.gluuOrg}`

const makeSut = (): SutTypes => {
  const clientStub = makeLdapClientMock()
  const rdnAttribute = cfg.default.database.ldap.attributes.remoteIdpUuid
  const dnStub = fakeDn
  const objectClass = cfg.default.database.ldap.objectClasses.remoteIdp
  const sut = new LdapCreateRemoteIdp(
    clientStub,
    dnStub,
    rdnAttribute,
    objectClass
  )
  return {
    sut,
    clientStub,
    dnStub
  }
}

const randomUuid = randomUUID()
const props: IRemoteIdpProps = {
  name: 'valid name',
  supportedSingleSignOnServices: makeSingleSignOnServices([
    { binding: 'valid binding', location: 'valid location' }
  ]),
  signingCertificates: ['cert1', 'cert2']
}
const makeRemoteIdp = (): RemoteIdp => {
  return new RemoteIdp(props, randomUuid)
}

describe('LdapCreateRemoteIdp', () => {
  describe('create', () => {
    it('should call client.add once with correct params', async () => {
      const objectClass = cfg.default.database.ldap.objectClasses.remoteIdp
      const { clientStub, sut } = makeSut()
      const addSpy = jest.spyOn(clientStub, 'add')
      const remoteIdp = makeRemoteIdp()
      await sut.create(remoteIdp)
      expect(addSpy).toHaveBeenCalledTimes(1)
      const expectedName = `${ldapCfg.attributes.remoteIdpUuid}=${randomUuid},${fakeDn}`
      expect(addSpy.mock.calls[0][0]).toEqual(expectedName)
      const expectedParams = {
        description: JSON.stringify(props),
        objectClass: objectClass
      }
      expect(addSpy.mock.calls[0][1]).toEqual(expectedParams)
    })
    it('should throw PersistenceError if create returns error', async () => {
      const { clientStub, sut } = makeSut()

      // force error callback to be called
      clientStub.add = jest.fn(
        (name: string, entry: Object, callback: ldapjs.ErrorCallback) => {
          // eslint-disable-next-line node/no-callback-literal
          return callback({
            message: 'error message',
            code: 69,
            name: 'ValidErrorName'
          })
        }
      )
      const remoteIdp = makeRemoteIdp()
      await expect(sut.create(remoteIdp)).rejects.toThrow(PersistenceError)
      jest.resetAllMocks()
    })
    it('should return true if client.add doesnt throw', async () => {
      const { sut } = makeSut()
      expect(await sut.create(makeRemoteIdp())).toBeTruthy()
    })
  })
})
