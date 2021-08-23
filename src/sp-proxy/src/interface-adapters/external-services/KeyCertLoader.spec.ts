import { KeyCertLoader } from '@sp-proxy/interface-adapters/external-services/KeyCertLoader'
import * as fs from 'fs'
jest.mock('fs')

const fakePath = 'valid path value'

describe('KeyCertLoader', () => {
  it('should call fs.readFileSync with received arg', async () => {
    const sut = new KeyCertLoader()
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync')
    await sut.load(fakePath)
    expect(readFileSyncSpy).toHaveBeenCalledTimes(1)
    expect(readFileSyncSpy).toHaveBeenCalledWith(fakePath)
  })
})
