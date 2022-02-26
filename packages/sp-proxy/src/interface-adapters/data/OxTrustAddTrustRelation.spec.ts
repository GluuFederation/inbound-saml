// should call persistence api once

import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import axios from 'axios'
import { IDataMapper } from '../protocols/IDataMapper'
import { TrustRelationDataModel } from './models/TrustRelationDataModel'
import { OxTrustAddTrustRelation } from './OxTrustAddTrustRelation'
import { IOxTrustApiSettings } from './protocols/IOxTrustApiSettings'

// receives trust relation entity
// maps entity to data model
// calls axios post with data model
// validate response (throw error if error)

const makeSettings = (): IOxTrustApiSettings => {
  const settings: IOxTrustApiSettings = {
    host: 'valid-host.com',
    clientId: 'valid client id',
    completePath: 'valid/path/v1',
    tokenUrl: 'valid token url',
    kid: 'valid kid',
    pvkOrSecret: 'valid pvt or secret'
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

interface SutTypes {
  oxTrustApiSettings: IOxTrustApiSettings
  dataModelMapperStub: IDataMapper<TrustRelation, TrustRelationDataModel>
  sut: IAddTrGateway
}

const makeSut = (): SutTypes => {
  const oxTrustApiSettings = makeSettings()
  const dataModelMapperStub = makeDataModelMapper()
  const sut = new OxTrustAddTrustRelation(
    oxTrustApiSettings,
    dataModelMapperStub
  )
  return {
    oxTrustApiSettings,
    dataModelMapperStub,
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
})
