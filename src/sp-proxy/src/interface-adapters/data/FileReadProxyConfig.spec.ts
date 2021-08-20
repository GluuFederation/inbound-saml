import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import * as configEntity from '@sp-proxy/entities/SpProxyConfig'
import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
import { FileReadProxyConfig } from '@sp-proxy/interface-adapters/data/FileReadProxyConfig'
import * as fs from 'fs'

jest.mock('@sp-proxy/entities/SpProxyConfig')
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
  const buffer = Buffer.from('a fake json string config')
  it('should call fs.readFileSync with correct params', async () => {
    const readFileSyncSpy = jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValueOnce(buffer)
    jest.spyOn(JSON, 'parse').mockReturnValueOnce('valid parsed object')
    const sut = new FileReadProxyConfig()
    await sut.read()
    expect(readFileSyncSpy).toHaveBeenCalledTimes(1)
    expect(readFileSyncSpy).toHaveBeenCalledWith(mockedPath)
  })
  it('should call toString from received buffer', async () => {
    /// const toStringSpy = jest.spyOn(Buffer.prototype, 'toString')
    jest.spyOn(JSON, 'parse').mockReturnValueOnce('valid parsed object')
    const toStringSpy = jest.spyOn(buffer, 'toString')
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(buffer)
    jest.spyOn(JSON, 'parse')
    const sut = new FileReadProxyConfig()
    await sut.read()
    expect(toStringSpy).toHaveBeenCalledTimes(1)
  })
  it('should call JSON Parse once with received string', async () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(buffer)
    const parseSpy = jest
      .spyOn(JSON, 'parse')
      .mockReturnValueOnce('valid parsed object')
    const sut = new FileReadProxyConfig()
    await sut.read()
    expect(parseSpy).toHaveBeenCalledTimes(1)
    expect(parseSpy).toHaveBeenCalledWith('a fake json string config')
  })
  it('should create a SpProxyConfig instance with parsed object', async () => {
    jest.spyOn(JSON, 'parse').mockReturnValueOnce('valid parsed object')
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(buffer)
    const constructorSpy = jest.spyOn(configEntity, 'SpProxyConfig')
    const sut = new FileReadProxyConfig()
    await sut.read()
    expect(constructorSpy).toHaveBeenCalledTimes(1)
    expect(constructorSpy).toHaveBeenCalledWith('valid parsed object')
  })
  it('should return the created instance', async () => {
    jest
      .spyOn(JSON, 'parse')
      .mockReturnValueOnce(
        'valid parsed object' as unknown as SpProxyConfigProps
      )
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(buffer)
    const entitymock = jest.spyOn(configEntity, 'SpProxyConfig')
    const createdInstance = new configEntity.SpProxyConfig(
      'valid parsed object' as unknown as SpProxyConfigProps
    )
    entitymock.mockImplementationOnce(
      () => createdInstance as unknown as configEntity.SpProxyConfig
    )
    const sut = new FileReadProxyConfig()
    expect(await sut.read()).toStrictEqual(createdInstance)
  })
  it('should throw PersistenceError if fs throws', async () => {
    jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new FileReadProxyConfig()
    await expect(sut.read()).rejects.toThrow(PersistenceError)
  })
})
