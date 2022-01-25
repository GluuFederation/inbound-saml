// should call persistence api once

import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import axios from 'axios'
import { OxTrustAddTrustRelation } from './OxTrustAddTrustRelation'

const oxTrustApiSettings = {
  uri: 'valid uri',
  path: 'valid path',
  trustRelationEndpoint: 'valid endpoint'
}

const makeSut = (): IAddTrGateway => {
  return new OxTrustAddTrustRelation(oxTrustApiSettings)
}

describe('OxTrustAddTrustRelation', () => {
  it('should call post with api uri and path', async () => {
    const postSpy = jest.spyOn(axios, 'post').mockResolvedValue('success')
    const sut = makeSut()
    await sut.add('valid trust relation' as any)
    expect(postSpy).toHaveBeenCalledTimes(1)
    expect(postSpy).toHaveBeenCalledWith('valid uri/valid path/valid endpoint')
  })
})
