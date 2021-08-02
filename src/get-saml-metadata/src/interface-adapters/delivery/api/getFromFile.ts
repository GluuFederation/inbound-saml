import { GetExternalDataInteractor } from '../../../use-cases/GetExternalDataInteractor'
import { UrlOrPath } from '../../../use-cases/GetExternalDataRequestModel'
import { makeFileXmlMetadataLoaderAdapter } from '../../data/factories/makeFileLoaderAdapter'

export const getFromFile = (path: UrlOrPath): any => {
  const xmlMetadataLoader = makeFileXmlMetadataLoaderAdapter()
}
