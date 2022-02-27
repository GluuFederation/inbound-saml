// should call persistence api once

import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
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
  TrustRelationDataModel
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

describe('OxTrustAddTrustRelation', () => {
  it('should call data model mapper with entity', async () => {
    jest.spyOn(axios, 'post').mockResolvedValue('success')
    const { dataModelMapperStub, sut } = makeSut()
    const mapSpy = jest.spyOn(dataModelMapperStub, 'map')
    await sut.add('valid trust relation entity' as any)
    expect(mapSpy).toHaveBeenCalledWith('valid trust relation entity')
  })
  it('should call post with api uri and path', async () => {
    const postSpy = jest.spyOn(axios, 'post').mockResolvedValue('success')
    const { sut, oxTrustApiSettings } = makeSut()
    await sut.add('valid trust relation' as any)
    expect(postSpy).toHaveBeenCalledTimes(1)
    const expectedArg = `https://${oxTrustApiSettings.host}/${oxTrustApiSettings.completePath}/trusted-idp`
    expect(postSpy.mock.calls[0][0]).toEqual(expectedArg)
  })
  it('should call post with mapped data model', async () => {
    const postSpy = jest.spyOn(axios, 'post').mockResolvedValue('success')
    const { sut, dataModelMapperStub } = makeSut()
    jest
      .spyOn(dataModelMapperStub, 'map')
      .mockResolvedValueOnce('valid mapped data model' as any)
    await sut.add('valid trust relation' as any)
    expect(postSpy.mock.calls[0][1]).toEqual('valid mapped data model')
  })
  it('should throw if axios throws', async () => {
    const axiosError: AxiosError = {
      config: {},
      isAxiosError: true,
      toJSON: function (): object {
        throw new Error('Function not implemented.')
      },
      name: '',
      message: ''
    }
    jest.spyOn(axios, 'post').mockRejectedValueOnce(axiosError)
    const { sut } = makeSut()
    await expect(sut.add('valid tr entity' as any)).rejects.toThrow()
  })
  it('should call authenticator if 401', async () => {
    const config: AxiosRequestConfig = {}
    const unauthorizeedResponse: AxiosResponse = {
      data: {},
      status: 401,
      statusText: 'Unauthrorized',
      headers: {},
      config: {}
    }
    const error: AxiosError = {
      response: unauthorizeedResponse,
      config: config,
      isAxiosError: true,
      toJSON: function (): object {
        throw new Error('Function not implemented.')
      },
      name: 'AxiosError',
      message: 'Request failed with status code 401'
    }
    jest.spyOn(axios, 'post').mockRejectedValueOnce(error)
    const { sut, authenticatorStub } = makeSut()
    const authenticateSpy = jest.spyOn(authenticatorStub, 'authenticate')
    await sut.add('valid tr' as any)
    expect(authenticateSpy).toHaveBeenCalled()
  })
})
