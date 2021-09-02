import { GenerateMetadataResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataResponseUseCaseParams'
import { GenerateMetadataUseCaseMapper } from '@sp-proxy/use-cases/mappers/GenerateMetadataUseCaseMapper'

describe('GenerateMetadataUseCaseMapper', () => {
  it('should map IXmlData to useCaseParams', () => {
    const fakeXmlData = 'a super fake xml data string'
    const expected: GenerateMetadataResponseUseCaseParams = {
      xmldata: fakeXmlData
    }
    const sut = new GenerateMetadataUseCaseMapper()
    expect(sut.map(fakeXmlData)).toStrictEqual(expected)
  })
})
