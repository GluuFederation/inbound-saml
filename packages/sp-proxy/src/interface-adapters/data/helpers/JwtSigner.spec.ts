import * as jwt from 'jsonwebtoken'
import { IJwtHeader } from '../protocols/IJwtHeader'
import { IJwtPayload } from '../protocols/IJwtPayload'
import { IJwtSigner } from '../protocols/IJwtSigner'
import { JwtSigner } from './JwtSigner'
jest.mock('jsonwebtoken')

const makeSut = (): IJwtSigner => {
  return new JwtSigner()
}

describe('JwtSigner', () => {
  describe('sign', () => {
    it('should call jsonwebtoken sign once with correct params', () => {
      const sut = makeSut()
      const jwtSignSpy = jest.spyOn(jwt, 'sign')
      const fakeHeader: IJwtHeader = {
        TYP: 'JWT',
        alg: 'RS256',
        kid: 'valid key id'
      }
      const fakePayload = 'valid payload' as unknown as IJwtPayload
      const fakeSecret = 'valid secret'

      const expectedJwtModuleOptions: jwt.SignOptions = {
        algorithm: fakeHeader.alg,
        keyid: fakeHeader.kid
      }

      sut.sign(fakeHeader, fakePayload, fakeSecret)

      expect(jwtSignSpy).toHaveBeenCalledTimes(1)
      expect(jwtSignSpy).toHaveBeenCalledWith(
        fakePayload,
        fakeSecret,
        expectedJwtModuleOptions
      )
    })
  })
})
