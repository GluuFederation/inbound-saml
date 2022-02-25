// should call persistence api once

import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import axios from 'axios'
import { OxTrustAddTrustRelation } from './OxTrustAddTrustRelation'
import { IOxTrustApiSettings } from './protocols/IOxTrustApiSettings'

// const oxTrustApiSettings = {
//   uri: 'valid uri',
//   path: 'valid path',
//   trustRelationEndpoint: 'valid endpoint'
// }

const makeSettings = (): IOxTrustApiSettings => {
  const settings: IOxTrustApiSettings = {
    host: 'valid-host.com',
    clientId: 'valid client id',
    completePath: 'valid/path/v1',
    tokenUrl: 'valid token url',
    kid: 'valid kid',
    pvkOrSecret: 'valid pvt or secret'
  }
  return settings
}

interface SutTypes {
  oxTrustApiSettings: IOxTrustApiSettings
  sut: IAddTrGateway
}

const makeSut = (): SutTypes => {
  const oxTrustApiSettings = makeSettings()
  const sut = new OxTrustAddTrustRelation(oxTrustApiSettings)
  return {
    oxTrustApiSettings,
    sut
  }
}

describe('OxTrustAddTrustRelation', () => {
  it('should call post with api uri and path', async () => {
    const postSpy = jest.spyOn(axios, 'post').mockResolvedValue('success')
    const { sut, oxTrustApiSettings } = makeSut()
    await sut.add('valid trust relation' as any)
    expect(postSpy).toHaveBeenCalledTimes(1)
    const expectedArg = `https://${oxTrustApiSettings.host}/${oxTrustApiSettings.completePath}/trusted-idp`
    expect(postSpy).toHaveBeenCalledWith(expectedArg)
  })
})
