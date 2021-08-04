// ECMA6 import style needed for some mocks
import * as loader from '@get-saml-metadata/interface-adapters/data/adapters/FileXmlMetadataLoaderAdapter'
import { Getter } from '@get-saml-metadata/interface-adapters/delivery/api/getFromFile'
import { GetExternalDataController } from '@get-saml-metadata/interface-adapters/delivery/GetExternalDataController'
import * as interactor from '@get-saml-metadata/use-cases/GetExternalDataInteractor'
import { validFilePath } from '../../../../../testdata/fakes'

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
