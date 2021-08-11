import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { LdapCreateRemoteIdp } from '@sp-proxy/interface-adapters/data/LdapCreateRemoteIdp'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { randomUUID } from 'crypto'
import * as ldap from 'ldapjs'
import * as config from './config/env'

const ldapCfg = config.default.database.ldap

const makeClient = (): ldap.Client => {
  const client = ldap.createClient({
    url: ldapCfg.url
  })
  client.on('error', (err) => {
    throw new Error(err)
  })
  client.bind(
    ldapCfg.credentials.adminLogin,
    ldapCfg.credentials.adminPwd,
    (err, result) => {
      if (err !== null) {
        throw new Error(err.name + ' ' + err.message)
      }
    }
  )
  return client
}

const createEntries = (): any => {
  const client = makeClient()
  const inboundSamlOu = ldapCfg.names.inboundSamlOu
  client.add(
    `${inboundSamlOu},${ldapCfg.names.gluuOrg}`,
    {
      description: 'Inbound Saml Module',
      objectclass: 'organizationalUnit'
    },
    (err) => {
      if (err.code === 68) {
        // do nothing
      } else console.log(err)
    }
  )
  client.add(
    `${ldapCfg.names.remoteIdpsOu},${inboundSamlOu},${ldapCfg.names.gluuOrg}`,
    {
      description: 'Remote Idps',
      objectclass: 'organizationalUnit'
    },
    (err) => {
      if (err.code === 68) {
        // do nothing, entry already exist
      } else console.log(err)
    }
  )
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

describe('LdapCreateRemoteIdp - integration', () => {
  beforeAll(() => {
    createEntries()
  })
  it('should create entity in LDAP', async () => {
    const client = makeClient()
    const dn = `${ldapCfg.names.remoteIdpsOu},${ldapCfg.names.inboundSamlOu},${ldapCfg.names.gluuOrg}`
    const rdnAttribute = ldapCfg.attributes.remoteIdpUuid
    const objectClass = ldapCfg.objectClasses.remoteIdp
    const sut = new LdapCreateRemoteIdp(client, dn, rdnAttribute, objectClass)
    expect(sut.create(makeRemoteIdp())).toBeTruthy()
  })
})
