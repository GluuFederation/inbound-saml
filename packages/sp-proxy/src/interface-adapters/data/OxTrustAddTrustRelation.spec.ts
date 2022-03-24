// should call persistence api once

import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import https from 'https'
import { IDataMapper } from '../protocols/IDataMapper'
import { TrustRelationDataModel } from './models/TrustRelationDataModel'
import { OxTrustAddTrustRelation } from './OxTrustAddTrustRelation'
import { IOxTrustApiSettings } from './protocols/IOxTrustApiSettings'
import { IUmaAuthenticator } from './protocols/IUmaAuthenticator'

// receives trust relation entity
// maps entity to data model
// calls axios post with data model
// call uma authenticator if not authorized
// throw AuthenticationError if uma throws
// validate response (throw error if axios error)

const makeSettings = (): IOxTrustApiSettings => {
  const settings: IOxTrustApiSettings = {
    host: 'valid-host.com',
    clientId: 'valid client id',
    completePath: 'valid/path/v1',
    tokenUrl: 'valid token url',
    kid: 'valid kid',
    pvkPath: 'valid pvk path'
  }
  return settings
}

const makeDataModelMapper = (): IDataMapper<
  TrustRelation,
  TrustRelationDataModel.Params
> => {
  class DataModelMapperStub
    implements IDataMapper<TrustRelation, TrustRelationDataModel>
  {
    async map(mappedFrom: TrustRelation): Promise<TrustRelationDataModel> {
      return 'valid TrustRelationDataModel' as any
    }
  }
  return new DataModelMapperStub()
}

const makeAuthenticator = (): IUmaAuthenticator => {
  class UmaAuthenticatorStub implements IUmaAuthenticator {
    async authenticate(endpoint: string): Promise<string> {
      return 'valid bearer token'
    }
  }
  return new UmaAuthenticatorStub()
}
interface SutTypes {
  oxTrustApiSettings: IOxTrustApiSettings
  dataModelMapperStub: IDataMapper<TrustRelation, TrustRelationDataModel>
  authenticatorStub: IUmaAuthenticator
  sut: IAddTrGateway
}

const makeSut = (): SutTypes => {
  const oxTrustApiSettings = makeSettings()
  const dataModelMapperStub = makeDataModelMapper()
  const authenticatorStub = makeAuthenticator()
  const sut = new OxTrustAddTrustRelation(
    oxTrustApiSettings,
    dataModelMapperStub,
    authenticatorStub
  )
  return {
    oxTrustApiSettings,
    dataModelMapperStub,
    authenticatorStub,
    sut
  }
}

const validResponseStub: AxiosResponse = {
  data: {},
  status: 201,
  statusText: 'Created',
  headers: undefined,
  config: {}
}

jest.spyOn(axios, 'post').mockResolvedValue(validResponseStub)

describe('OxTrustAddTrustRelation', () => {
  it('should call data model mapper with entity', async () => {
    const { dataModelMapperStub, sut } = makeSut()
    const mapSpy = jest.spyOn(dataModelMapperStub, 'map')
    await sut.add('valid trust relation entity' as any)
    expect(mapSpy).toHaveBeenCalledWith('valid trust relation entity')
  })
  it('should call post with api uri and path', async () => {
    const postSpy = jest
      .spyOn(axios, 'post')
      .mockResolvedValue(validResponseStub)
    const { sut, oxTrustApiSettings } = makeSut()
    await sut.add('valid trust relation' as any)
    expect(postSpy).toHaveBeenCalledTimes(1)
    const expectedArg = `https://${oxTrustApiSettings.host}/${oxTrustApiSettings.completePath}/trusted-idp`
    expect(postSpy.mock.calls[0][0]).toEqual(expectedArg)
  })
  it('should call post with mapped data model', async () => {
    const postSpy = jest
      .spyOn(axios, 'post')
      .mockResolvedValue(validResponseStub)
    const { sut, dataModelMapperStub } = makeSut()
    jest
      .spyOn(dataModelMapperStub, 'map')
      .mockResolvedValueOnce('valid mapped data model' as any)
    await sut.add('valid trust relation' as any)
    expect(postSpy.mock.calls[0][1]).toEqual('valid mapped data model')
  })
  it('should throw if axios throws', async () => {
    jest.spyOn(axios, 'post').mockImplementationOnce(() => {
      throw new Error()
    })
    const { sut } = makeSut()
    await expect(sut.add('valid tr entity' as any)).rejects.toThrow()
  })
  it('should call authenticator once', async () => {
    const { sut, authenticatorStub } = makeSut()
    const authenticateSpy = jest.spyOn(authenticatorStub, 'authenticate')
    await sut.add('valid tr' as any)
    expect(authenticateSpy).toHaveBeenCalled()
  })
  it('should throw if status is not 201', async () => {
    const mockedResponse: AxiosResponse = {
      data: undefined,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    }
    jest.spyOn(axios, 'post').mockResolvedValueOnce(mockedResponse)
    const { sut } = makeSut()
    await expect(sut.add('valid trust relation' as any)).rejects.toThrow()
  })
  it('should have token in request', async () => {
    const mockedResponse: AxiosResponse = {
      data: undefined,
      status: 201,
      statusText: 'OK',
      headers: {},
      config: {}
    }
    const postSpy = jest
      .spyOn(axios, 'post')
      .mockResolvedValueOnce(mockedResponse)
    const { sut, authenticatorStub } = makeSut()
    jest
      .spyOn(authenticatorStub, 'authenticate')
      .mockResolvedValueOnce('validBearerToken')
    await sut.add('valid trust relation' as any)
    const expectedConfig: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer validBearerToken'
      }
    }
    expect(postSpy.mock.calls[0][2]?.headers).toMatchObject(
      expectedConfig.headers
    )
  })
  it('should have authenticators token in request', async () => {
    const mockedResponse: AxiosResponse = {
      data: undefined,
      status: 201,
      statusText: 'OK',
      headers: {},
      config: {}
    }
    const postSpy = jest
      .spyOn(axios, 'post')
      .mockResolvedValueOnce(mockedResponse)
    const { sut, authenticatorStub } = makeSut()
    jest
      .spyOn(authenticatorStub, 'authenticate')
      .mockResolvedValueOnce('authenticatorsToken')
    await sut.add('valid trust relation' as any)
    const expectedConfig: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer authenticatorsToken'
      }
    }
    expect(postSpy.mock.calls[0][2]?.headers).toMatchObject(
      expectedConfig.headers
    )
  })
  it('should throw if mapper throws', async () => {
    const { sut, dataModelMapperStub } = makeSut()
    jest.spyOn(dataModelMapperStub, 'map').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.add('valid trust relation' as any)).rejects.toThrow()
  })
  it('should throw if authenticator throws', async () => {
    const { sut, authenticatorStub } = makeSut()
    jest.spyOn(authenticatorStub, 'authenticate').mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.add('valid trust relation' as any)).rejects.toThrow()
  })
  it('should call https Agent once with correct params', async () => {
    const agentSpy = jest.spyOn(https, 'Agent')
    const { sut } = makeSut()
    await sut.add('valid trust relation' as any)
    expect(agentSpy).toHaveBeenCalledWith({ rejectUnauthorized: false })
  })
  it('shoulld call get with https agent', async () => {
    const postSpy = jest.spyOn(axios, 'post')
    const { sut } = makeSut()
    await sut.add('valid trust relation' as any)
    expect(postSpy.mock.calls[0][2]?.httpsAgent.options).toMatchObject({
      rejectUnauthorized: false
    })
  })
})
