import { validFilePath } from '../../../../../testdata/fakes'
import * as interactor from '../../../use-cases/GetExternalDataInteractor'
import * as loader from '../../data/adapters/FileXmlMetadataLoaderAdapter'
import { GetExternalDataController } from '../GetExternalDataController'
import * as api from './getFromFile'

jest.mock('../../../use-cases/GetExternalDataInteractor')
jest.mock('../GetExternalDataController')
jest.mock('../../data/adapters/FileXmlMetadataLoaderAdapter')

describe('getFromFile', () => {
  it('should call FileXmlMetadataLoaderAdapter constructor once', async () => {
    await api.getFromFile(validFilePath)
    const loaderSpy = jest.spyOn(loader, 'FileXmlMetadataLoaderAdapter')
    expect(loaderSpy).toHaveBeenCalledTimes(1)
  })
  it('should call Interactor constructor once', async () => {
    const interactorSpy = jest.spyOn(interactor, 'GetExternalDataInteractor')
    await api.getFromFile(validFilePath)
    expect(interactorSpy).toHaveBeenCalledTimes(1)
  })
  it('should call controller.handle', async () => {
    const handleSpy = jest.spyOn(GetExternalDataController.prototype, 'handle')
    await api.getFromFile(validFilePath)
    expect(handleSpy).toHaveBeenCalledTimes(1)
  })
})
