import { KeyCertLoader } from '@sp-proxy/interface-adapters/external-services/KeyCertLoader'
import * as fs from 'fs'
jest.mock('fs')

const fakePath = 'valid path value'

describe('KeyCertLoader', () => {
  it('should call fs.readFileSync with received arg', async () => {
    const bufferMock = Buffer.from('a valid string to be bufferized')
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(bufferMock)
    const sut = new KeyCertLoader()
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync')
    await sut.load(fakePath)
    expect(readFileSyncSpy).toHaveBeenCalledTimes(1)
    expect(readFileSyncSpy).toHaveBeenCalledWith(fakePath)
  })
  it('should call toString with received buffer', async () => {
    const bufferMock = Buffer.from('a valid string to be bufferized')
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(bufferMock)
    const toStringSpy = jest.spyOn(bufferMock, 'toString')
    const sut = new KeyCertLoader()
    await sut.load(fakePath)
    expect(toStringSpy).toHaveBeenCalledTimes(1)
    expect(toStringSpy).toHaveBeenCalledWith()
  })
  it('return value returned from toString', async () => {
    const bufferMock = Buffer.from('a valid string to be bufferized')
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(bufferMock)
    jest
      .spyOn(bufferMock, 'toString')
      .mockReturnValueOnce('valid value to be returned')
    const sut = new KeyCertLoader()
    expect(await sut.load(fakePath)).toEqual('valid value to be returned')
  })
  it('should throw if readFileSync throws', async () => {
    jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new KeyCertLoader()
    await expect(sut.load(fakePath)).rejects.toThrow()
  })
})
