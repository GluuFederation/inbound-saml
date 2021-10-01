import { Request } from 'express'
import { verifyCallback } from './passportMiddleware'

describe('passportMiddleare', () => {
  describe('verifyCallback', () => {
    it('should call callback with error if profile not found', () => {
      const toMock = {
        doneCallback: (
          err: Error | null,
          user?: Record<string, unknown> | undefined,
          info?: Record<string, unknown> | undefined
        ) => {
          console.log(err)
        }
      }
      const doneSpy = jest.spyOn(toMock, 'doneCallback')
      verifyCallback('request' as unknown as Request, null, toMock.doneCallback)
      expect(doneSpy).toHaveBeenCalledTimes(1)
      expect(doneSpy).toHaveBeenCalledWith(Error('profile not found'))
    })
  })
})
