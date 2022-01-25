// should call persistence api once

import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import axios from 'axios'
import { OxTrustAddTrustRelation } from './OxTrustAddTrustRelation'

const makeSut = (): IAddTrGateway => {
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
