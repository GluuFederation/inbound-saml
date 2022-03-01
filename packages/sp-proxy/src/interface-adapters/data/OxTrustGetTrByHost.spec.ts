// receives host
// calls GET endpoint
// throw if axios throw
// call mapper with datamodel
// throw if mapper throws
// map respond w/ entity
// return entity

import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IGetTrByHostGateway } from '@sp-proxy/use-cases/ports/IGetTrByHostGateway'
import axios from 'axios'
import { IDataMapper } from '../protocols/IDataMapper'
import { TrustRelationDataModel } from './models/TrustRelationDataModel'
import { OxTrustGetTrByHost } from './OxTrustGetTrByHost'
import { IOxTrustApiSettings } from './protocols/IOxTrustApiSettings'

const makeDataMapper = (): IDataMapper<
  TrustRelationDataModel,
  TrustRelation
> => {
  class DataMapperStub
    implements IDataMapper<TrustRelationDataModel, TrustRelation>
  {
    async map(mappedFrom: TrustRelationDataModel): Promise<TrustRelation> {
      return 'stubbed TrustRelation entity' as any
    }
  }
  return new DataMapperStub()
}

const makeOxTrustApiSettings = (): IOxTrustApiSettings => {
  return {
    host: 'validhost',
    clientId: 'valid-client-id',
    completePath: 'the-complete-path/v1',
    tokenUrl: 'valid-token-url',
    kid: 'valid kid',
    pvkPath: 'valid private key path'
  }
}

interface SutTypes {
  dataMapperStub: IDataMapper<TrustRelationDataModel, TrustRelation>
  oxTrustApiSettingsStub: IOxTrustApiSettings
  sut: IGetTrByHostGateway
}

const makeSut = (): SutTypes => {
  const dataMapperStub = makeDataMapper()
  const oxTrustApiSettingsStub = makeOxTrustApiSettings()
  const sut = new OxTrustGetTrByHost(dataMapperStub, oxTrustApiSettingsStub)
  return { dataMapperStub, oxTrustApiSettingsStub, sut }
}

describe('OxTrustGetTrByHost', () => {
  it('should call axios get', async () => {
    const getSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce('any resolved response')
    const { sut } = makeSut()
    await sut.findByHost('valid host')
    expect(getSpy).toBeCalled()
  })
  it('should call axios get with correct params', async () => {
    const getSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce('any resolved response')
    const { oxTrustApiSettingsStub, sut } = makeSut()
    const expectedUrlParam = `https://${oxTrustApiSettingsStub.host}/${oxTrustApiSettingsStub.completePath}/trusted-idps/valid-host`
    await sut.findByHost('valid-host')
    expect(getSpy).toHaveBeenCalledWith(expectedUrlParam)
  })
  it('should throw if axios throw', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error())
    const { sut } = makeSut()
    await expect(sut.findByHost('valid-host')).rejects.toThrow()
  })
  it('should call mapper with response data', async () => {
    jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({ data: 'valid TR data model' })
    const { dataMapperStub, sut } = makeSut()
    const mapSpy = jest.spyOn(dataMapperStub, 'map')
    await sut.findByHost('valid host')
    expect(mapSpy).toHaveBeenCalledWith('valid TR data model')
  })
  it('should throw if mapper throws', async () => {
    jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({ data: 'any resolved response' })
    const { sut, dataMapperStub } = makeSut()
    jest.spyOn(dataMapperStub, 'map').mockRejectedValueOnce(new Error())
    await expect(sut.findByHost('valid host')).rejects.toThrow()
  })
  it('should return mapped entity', async () => {
    jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({ data: 'any resolved response' })
    const { sut, dataMapperStub } = makeSut()
    jest
      .spyOn(dataMapperStub, 'map')
      .mockResolvedValueOnce('mapped TR entity' as any)
    expect(await sut.findByHost('valid host')).toEqual('mapped TR entity')
  })
})
