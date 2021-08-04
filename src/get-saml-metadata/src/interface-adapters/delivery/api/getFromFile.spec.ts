import { validFilePath } from '../../../../../testdata/fakes'
import * as interactor from '../../../use-cases/GetExternalDataInteractor'
import * as loader from '../../data/adapters/FileXmlMetadataLoaderAdapter'
import { GetExternalDataController } from '../GetExternalDataController'
import { GetExternalDataPresenter } from '../GetExternalDataPresenter'
import { Getter } from './getFromFile'

jest.mock('../../../use-cases/GetExternalDataInteractor')
jest.mock('../GetExternalDataController')
jest.mock('../../data/adapters/FileXmlMetadataLoaderAdapter')
jest.mock('../GetExternalDataPresenter')

const makeSut = (): Getter => {
  return new Getter()
}

describe('Getter', () => {
  it('should call FileXmlMetadataLoaderAdapter constructor once', async () => {
    const loaderSpy = jest.spyOn(loader, 'FileXmlMetadataLoaderAdapter')
    makeSut()
    expect(loaderSpy).toHaveBeenCalledTimes(1)
  })
  it('should call Interactor constructor once', async () => {
    const interactorSpy = jest.spyOn(interactor, 'GetExternalDataInteractor')
    makeSut()
    expect(interactorSpy).toHaveBeenCalledTimes(1)
  })
  describe('getFromFile', () => {
    it('should call controller.handle', async () => {
      const handleSpy = jest.spyOn(GetExternalDataController.prototype, 'handle')
      const api = makeSut()
      await api.getFromFile(validFilePath)
      expect(handleSpy).toHaveBeenCalledTimes(1)
    })
    it('should call emitter once', async () => {
      const api = makeSut()
      const presentSpy = jest.spyOn(
        api.emiter, 'on')
      await api.getFromFile(validFilePath)
      expect(presentSpy).toHaveBeenCalledTimes(1)
    })
  })
})
