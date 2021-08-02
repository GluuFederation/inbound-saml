import { validFilePath } from '../../../../../testdata/fakes'
import * as interactor from '../../../use-cases/GetExternalDataInteractor'
import { UrlOrPath } from '../../../use-cases/GetExternalDataRequestModel'
import * as loader from '../../data/adapters/FileXmlMetadataLoaderAdapter'
import { makeFileXmlMetadataLoaderAdapter } from '../../data/factories/makeFileLoaderAdapter'
import { GetExternalDataController } from '../GetExternalDataController'
import * as api from './getFromFile'
jest.mock('../../../use-cases/GetExternalDataInteractor')
jest.mock('../GetExternalDataController')
jest.mock('../../data/adapters/FileXmlMetadataLoaderAdapter')

 // makeFileXmlMetadataLoaderAdapter

describe('getFromFile', () => {
  it('should call FileXmlMetadataLoaderAdapter constructor', () => {
    api.getFromFile(validFilePath)
    const loaderSpy = jest.spyOn(loader, 'FileXmlMetadataLoaderAdapter')
    expect(loaderSpy).toHaveBeenCalledTimes(1)
  })
  // it('should call Interactor constructor', () => {
  //   const interactorSpy = jest.spyOn(interactor, 'GetExternalDataInteractor')
  //   api.getFromFile(validFilePath)
  //   expect(interactorSpy).toHaveBeenCalledTimes(1)
  // })
})
