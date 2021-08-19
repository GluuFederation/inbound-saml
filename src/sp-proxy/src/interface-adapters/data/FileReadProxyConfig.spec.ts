import { FileReadProxyConfig } from '@sp-proxy/interface-adapters/data/FileReadProxyConfig'
import * as fs from 'fs'

jest.mock('fs')
// mock file persistence configuration
jest.mock('@sp-proxy/interface-adapters/data/config/env', () => {
  return {
    database: {
      file: {
        proxyConfigPath: '/valid/path/to/file.xml'
      }
    }
  }
})

// same as mocked above
const mockedPath = '/valid/path/to/file.xml'

describe('FileReadProxyConfig', () => {
  const buffer = Buffer.from('a fake string')
  it('should call fs.readFileSync with correct params', async () => {
    const readFileSyncSpy = jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValueOnce(buffer)
    const sut = new FileReadProxyConfig()
    await sut.read()
    expect(readFileSyncSpy).toHaveBeenCalledTimes(1)
    expect(readFileSyncSpy).toHaveBeenCalledWith(mockedPath)
  })
  it('should call toString from received buffer', async () => {
    /// const toStringSpy = jest.spyOn(Buffer.prototype, 'toString')
    const toStringSpy = jest.spyOn(buffer, 'toString')
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(buffer)
    const sut = new FileReadProxyConfig()
    await sut.read()
    expect(toStringSpy).toHaveBeenCalledTimes(1)
  })
})
