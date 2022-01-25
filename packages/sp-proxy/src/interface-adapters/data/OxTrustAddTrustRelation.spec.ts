// should call persistence api once

import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import axios from 'axios'

const makeSut = (): IAddTrGateway => {
  class OxTrustAddTrustRelation implements IAddTrGateway {
    async add(trustRelation: TrustRelation): Promise<boolean> {
      await axios.post('any url')
      return true
    }
  }
  return new OxTrustAddTrustRelation()
}

describe('OxTrustAddTrustRelation', () => {
  it('should call axios post once', async () => {
    const postSpy = jest.spyOn(axios, 'post').mockResolvedValue('success')
    const sut = makeSut()
    await sut.add('valid trust relation' as any)
    expect(postSpy).toHaveBeenCalledTimes(1)
  })
})
