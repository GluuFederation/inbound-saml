import { GetTRMongoMapper } from './GetTRMongoMapper'
import { ListTRsMongoMapper } from './ListTRsMongoMapper'
jest.mock('./GetTRMongoMapper')

describe('ListTRsMongoMapper', () => {
  it('should call GetTRMongoMapper constructor once', async () => {
    const sut = new ListTRsMongoMapper()
    await sut.map(['valid list of documents'] as any)
    expect(GetTRMongoMapper).toHaveBeenCalledTimes(1)
  })
  it('should call map once', async () => {
    const sut = new ListTRsMongoMapper()
    const mapSpy = jest.spyOn(GetTRMongoMapper.prototype, 'map')
    await sut.map(['valid documents'] as any)
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith('valid documents')
  })
  it('should call map three times', async () => {
    const sut = new ListTRsMongoMapper()
    const mapSpy = jest.spyOn(GetTRMongoMapper.prototype, 'map')
    await sut.map([
      'valid document 1',
      'valid document 2',
      'valid document 3'
    ] as any)
    expect(mapSpy).toHaveBeenCalledTimes(3)
    expect(mapSpy).toHaveBeenNthCalledWith(1, 'valid document 1')
    expect(mapSpy).toHaveBeenNthCalledWith(2, 'valid document 2')
    expect(mapSpy).toHaveBeenNthCalledWith(3, 'valid document 3')
  })
  it('should call array push once', async () => {
    const sut = new ListTRsMongoMapper()
    jest
      .spyOn(GetTRMongoMapper.prototype, 'map')
      .mockResolvedValue('mapped document' as any)
    const pushSpy = jest.spyOn(Array.prototype as any, 'push')
    await sut.map(['valid documentsss'] as any)
    expect(pushSpy).toHaveBeenCalledTimes(1)
    expect(pushSpy).toHaveBeenCalledWith('mapped document')
  })
  it('should return pushed values', async () => {
    const sut = new ListTRsMongoMapper()
    jest
      .spyOn(GetTRMongoMapper.prototype, 'map')
      .mockResolvedValue('mapped document' as any)

    const TRs = await sut.map(['valid documentsss'] as any)
    expect(TRs).toEqual(['mapped document'])
  })
})
