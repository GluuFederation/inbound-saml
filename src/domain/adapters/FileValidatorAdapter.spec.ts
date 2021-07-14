import fs from 'fs'
import { FileValidatorAdapter } from './FileValidatorAdapter'

const validPath = '/valid/path/file.ext'

describe('FileValidatorAdapter', () => {
  it('should call existsSync with correct parameters', () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync')
    const sut = new FileValidatorAdapter()
    sut.isValid(validPath)
    expect(existsSyncSpy).toBeCalledTimes(1)
    expect(existsSyncSpy).toBeCalledWith(validPath)
  })
})
