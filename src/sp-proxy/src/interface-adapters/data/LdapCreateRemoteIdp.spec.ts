import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { LdapCreateRemoteIdp } from '@sp-proxy/interface-adapters/data/LdapCreateRemoteIdp'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { randomUUID } from 'crypto'
import * as ldapjs from 'ldapjs'
import * as cfg from '../data/config/env'

const ldapCfg = cfg.default.database.ldap

const makeClientMock = (): ldapjs.Client => {
  class LdapClientMock implements ldapjs.Client {
    add(name: string, entry: Object, callback: ldapjs.ErrorCallback): void
    add(
      name: string,
      entry: Object,
      controls: any,
      callback: ldapjs.ErrorCallback
    ): void
    add(name: any, entry: any, controls: any, callback?: any): void {}

    connected = true
    bind(dn: string, password: string, callback: ldapjs.CallBack): void
    bind(
      dn: string,
      password: string,
      controls: any,
      callback: ldapjs.CallBack
    ): void
    bind(dn: any, password: any, controls: any, callback?: any): void {
      throw new Error('Method not implemented.')
    }

    compare(
      name: string,
      attr: string,
      value: string,
      callback: ldapjs.CompareCallback
    ): void
    compare(
      name: string,
      attr: string,
      value: string,
      controls: any,
      callback: ldapjs.CompareCallback
    ): void
    compare(
      name: any,
      attr: any,
      value: any,
      controls: any,
      callback?: any
    ): void {
      throw new Error('Method not implemented.')
    }

    del(name: string, callback: ldapjs.ErrorCallback): void
    del(name: string, controls: any, callback: ldapjs.ErrorCallback): void
    del(name: any, controls: any, callback?: any): void {
      throw new Error('Method not implemented.')
    }

    exop(name: string, value: string, callback: ldapjs.ExopCallback): void
    exop(
      name: string,
      value: string,
      controls: any,
      callback: ldapjs.ExopCallback
    ): void
    exop(name: any, value: any, controls: any, callback?: any): void {
      throw new Error('Method not implemented.')
    }

    modify(
      name: string,
      change: ldapjs.Change | ldapjs.Change[],
      callback: ldapjs.ErrorCallback
    ): void
    modify(
      name: string,
      change: ldapjs.Change | ldapjs.Change[],
      controls: any,
      callback: ldapjs.ErrorCallback
    ): void
    modify(name: any, change: any, controls: any, callback?: any): void {
      throw new Error('Method not implemented.')
    }

    modifyDN(
      name: string,
      newName: string,
      callback: ldapjs.ErrorCallback
    ): void
    modifyDN(
      name: string,
      newName: string,
      controls: any,
      callback: ldapjs.ErrorCallback
    ): void
    modifyDN(name: any, newName: any, controls: any, callback?: any): void {
      throw new Error('Method not implemented.')
    }

    search(
      base: string,
      options: ldapjs.SearchOptions,
      callback: ldapjs.SearchCallBack
    ): void
    search(
      base: string,
      options: ldapjs.SearchOptions,
      callback: ldapjs.SearchCallBack,
      _bypass: boolean
    ): void
    search(
      base: string,
      options: ldapjs.SearchOptions,
      controls: any,
      callback: ldapjs.SearchCallBack
    ): void
    search(
      base: string,
      options: ldapjs.SearchOptions,
      controls: any,
      callback: ldapjs.SearchCallBack,
      _bypass: boolean
    ): void
    search(
      base: any,
      options: any,
      controls: any,
      callback?: any,
      _bypass?: any
    ): void {
      throw new Error('Method not implemented.')
    }

    starttls(options: Object, controls: any, callback: ldapjs.CallBack): void
    starttls(
      options: Object,
      controls: any,
      callback: ldapjs.CallBack,
      _bypass: boolean
    ): void
    starttls(options: any, controls: any, callback: any, _bypass?: any): void {
      throw new Error('Method not implemented.')
    }

    unbind(callback?: ldapjs.ErrorCallback): void {
      throw new Error('Method not implemented.')
    }

    // eslint-disable-next-line node/handle-callback-err
    destroy(err?: any): void {
      throw new Error('Method not implemented.')
    }

    addListener(
      event: string | symbol,
      listener: (...args: any[]) => void
    ): this {
      throw new Error('Method not implemented.')
    }

    on(event: string | symbol, listener: (...args: any[]) => void): this {
      throw new Error('Method not implemented.')
    }

    once(event: string | symbol, listener: (...args: any[]) => void): this {
      throw new Error('Method not implemented.')
    }

    removeListener(
      event: string | symbol,
      listener: (...args: any[]) => void
    ): this {
      throw new Error('Method not implemented.')
    }

    off(event: string | symbol, listener: (...args: any[]) => void): this {
      throw new Error('Method not implemented.')
    }

    removeAllListeners(event?: string | symbol): this {
      throw new Error('Method not implemented.')
    }

    setMaxListeners(n: number): this {
      throw new Error('Method not implemented.')
    }

    getMaxListeners(): number {
      throw new Error('Method not implemented.')
    }

    listeners(event: string | symbol): Function[] {
      throw new Error('Method not implemented.')
    }

    rawListeners(event: string | symbol): Function[] {
      throw new Error('Method not implemented.')
    }

    emit(event: string | symbol, ...args: any[]): boolean {
      throw new Error('Method not implemented.')
    }

    listenerCount(event: string | symbol): number {
      throw new Error('Method not implemented.')
    }

    prependListener(
      event: string | symbol,
      listener: (...args: any[]) => void
    ): this {
      throw new Error('Method not implemented.')
    }

    prependOnceListener(
      event: string | symbol,
      listener: (...args: any[]) => void
    ): this {
      throw new Error('Method not implemented.')
    }

    eventNames(): Array<string | symbol> {
      throw new Error('Method not implemented.')
    }
  }
  return new LdapClientMock()
}

// const makeClient = (): ldapjs.Client => {
//   return ldapjs.createClient({ url: 'valid url' })
// }

interface SutTypes {
  sut: LdapCreateRemoteIdp
  clientStub: ldapjs.Client
  dnStub: string
}

const fakeDn = `${ldapCfg.names.remoteIdpsOu},${ldapCfg.names.inboundSamlOu},${ldapCfg.names.gluuOrg}`

const makeSut = (): SutTypes => {
  const clientStub = makeClientMock()
  const rdnAttribute = cfg.default.database.ldap.attributes.remoteIdpUuid
  const dnStub = fakeDn
  const sut = new LdapCreateRemoteIdp(clientStub, dnStub, rdnAttribute)
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
      const { clientStub, sut } = makeSut()
      const addSpy = jest.spyOn(clientStub, 'add')
      const remoteIdp = makeRemoteIdp()
      await sut.create(remoteIdp)
      expect(addSpy).toHaveBeenCalledTimes(1)
      const expectedName = `${ldapCfg.attributes.remoteIdpUuid}=${randomUuid},${fakeDn}`
      expect(addSpy.mock.calls[0][0]).toEqual(expectedName)
      expect(addSpy.mock.calls[0][1]).toEqual(props)
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
    })
  })
})
