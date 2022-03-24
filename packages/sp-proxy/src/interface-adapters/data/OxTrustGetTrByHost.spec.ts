// receives host
// calls GET endpoint
// throw if axios throw
// call mapper with datamodel
// throw if mapper throws
// map respond w/ entity
// return entity

import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IGetTrByHostGateway } from '@sp-proxy/use-cases/ports/IGetTrByHostGateway'
import axios, { AxiosRequestConfig } from 'axios'
import https from 'https'
import { IDataMapper } from '../protocols/IDataMapper'
import { TrustRelationDataModel } from './models/TrustRelationDataModel'
import { OxTrustGetTrByHost } from './OxTrustGetTrByHost'
import { IOxTrustApiSettings } from './protocols/IOxTrustApiSettings'
import { IUmaAuthenticator } from './protocols/IUmaAuthenticator'

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

const makeUmaAuthenticator = (): IUmaAuthenticator => {
  class UmaAuthenticatorStub implements IUmaAuthenticator {
    async authenticate(endpoint: string): Promise<string> {
      return 'bearer token stub'
    }
  }
  return new UmaAuthenticatorStub()
}

interface SutTypes {
  dataMapperStub: IDataMapper<TrustRelationDataModel, TrustRelation>
  oxTrustApiSettingsStub: IOxTrustApiSettings
  umaAuthenticatorStub: IUmaAuthenticator
  sut: IGetTrByHostGateway
}

const makeSut = (): SutTypes => {
  const dataMapperStub = makeDataMapper()
  const oxTrustApiSettingsStub = makeOxTrustApiSettings()
  const umaAuthenticatorStub = makeUmaAuthenticator()
  const sut = new OxTrustGetTrByHost(
    dataMapperStub,
    oxTrustApiSettingsStub,
    umaAuthenticatorStub
  )
  return { dataMapperStub, oxTrustApiSettingsStub, umaAuthenticatorStub, sut }
}

// axios.get stub
jest.spyOn(axios, 'get').mockResolvedValue({ data: 'valid TR data model' })

describe('OxTrustGetTrByHost', () => {
  it('should call axios get', async () => {
    const getSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce('any resolved response')
    const { sut } = makeSut()
    await sut.findByHost('valid host')
    expect(getSpy).toBeCalled()
  })
  it('should call axios get with correct url param', async () => {
    const getSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce('any resolved response')
    const { oxTrustApiSettingsStub, sut } = makeSut()
    const expectedUrlParam = `https://${oxTrustApiSettingsStub.host}/${oxTrustApiSettingsStub.completePath}/trusted-idp/valid-host`
    await sut.findByHost('valid-host')
    expect(getSpy).toHaveBeenCalledWith(expectedUrlParam, expect.anything())
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
  it('should have token on request', async () => {
    const getSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({ data: 'any resolved response' })
    const { sut, umaAuthenticatorStub } = makeSut()
    jest
      .spyOn(umaAuthenticatorStub, 'authenticate')
      .mockResolvedValueOnce('validBearerToken')
    await sut.findByHost('valid endpoint')
    const expectedConfig: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer validBearerToken'
      }
    }
    expect(getSpy.mock.calls[0][1]?.headers).toMatchObject(
      expectedConfig.headers
    )
  })
  it('should call authenticator once', async () => {
    const { sut, umaAuthenticatorStub } = makeSut()
    const authenticateSpy = jest.spyOn(umaAuthenticatorStub, 'authenticate')
    await sut.findByHost('valid host')
    expect(authenticateSpy).toHaveBeenCalled()
  })
  it('should call https Agent once with correct params', async () => {
    const agentSpy = jest.spyOn(https, 'Agent')
    const { sut } = makeSut()
    await sut.findByHost('valid host')
    expect(agentSpy).toHaveBeenCalledWith({ rejectUnauthorized: false })
  })
  it('shoulld call get with https agent', async () => {
    const getSpy = jest.spyOn(axios, 'get')
    const { sut } = makeSut()
    await sut.findByHost('valid host')
    expect(getSpy.mock.calls[0][1]?.httpsAgent.options).toMatchObject({
      rejectUnauthorized: false
    })
  })
})
