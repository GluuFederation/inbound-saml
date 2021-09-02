import { FileValidatorAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/FileValidatorAdapter'
import fs from 'fs'

const validPath = '/valid/path/file.ext'

describe('FileValidatorAdapter', () => {
  it('should call existsSync with correct parameters', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync')
    const sut = new FileValidatorAdapter()
    await sut.isValid(validPath)
    expect(existsSyncSpy).toBeCalledTimes(1)
    expect(existsSyncSpy).toBeCalledWith(validPath)
  })
  it('should return true if existsSync returns true', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true)
    const sut = new FileValidatorAdapter()
    expect(await sut.isValid(validPath)).toBeTruthy()
  })
  it('should return false if existsSync returns false', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false)
    const sut = new FileValidatorAdapter()
    expect(await sut.isValid(validPath)).toBeFalsy()
  })
  it('should throw if existsSync throws', async () => {
    const throwError = (): never => {
      throw new Error()
    }
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(throwError)
    const sut = new FileValidatorAdapter()
    const promise = sut.isValid(validPath)
    await expect(promise).rejects.toThrow()
  })
})
