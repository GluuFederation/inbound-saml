// receive response model
// return response dto

import { ReadSpProxyConfigPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/ReadSpProxyConfigPresenterMapper'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { ReadSpProxyConfigResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/ReadSpProxyConfigResponseUseCaseParams'

const fakeResponseModel: IResponseModel<ReadSpProxyConfigResponseUseCaseParams> =
  {
    requestId: 'fake requestId',
    response: {
      host: 'fake host',
      requestedIdentifierFormat: 'fake req id format',
      authnContextIdentifierFormat: 'fake authnContext id format',
      skipRequestCompression: true,
      decryption: {
        privateKey: 'fake decryption pvt key',
        cert: 'fake decryption cert'
      },
      signing: {
        privateKey: 'fake signing pvt key',
        cert: 'fake signing cert'
      }
    }
  }

describe('ReadSpProxyConfigPresenterMapper', () => {
  it('should map response model to dto w/ signing props', () => {
    const expected = {
      requestId: fakeResponseModel.requestId,
      body: {
        host: fakeResponseModel.response.host,
        requestedIdentifierFormat:
          fakeResponseModel.response.requestedIdentifierFormat,
        authnContextIdentifierFormat:
          fakeResponseModel.response.authnContextIdentifierFormat,
        skipRequestCompression:
          fakeResponseModel.response.skipRequestCompression,
        decryption: {
          privateKey: fakeResponseModel.response.decryption.privateKey,
          cert: fakeResponseModel.response.decryption.cert
        },
        signing: {
          privateKey: 'fake signing pvt key',
          cert: 'fake signing cert'
        }
      }
    }
    const sut = new ReadSpProxyConfigPresenterMapper()
    expect(sut.map(fakeResponseModel)).toStrictEqual(expected)
  })
  it('should map without signing opt props', () => {
    const responseModelWithoutSigning = {
      requestId: 'fake requestId',
      response: {
        host: 'fake host',
        requestedIdentifierFormat: 'fake req id format',
        authnContextIdentifierFormat: 'fake authnContext id format',
        skipRequestCompression: true,
        decryption: {
          privateKey: 'fake decryption pvt key',
          cert: 'fake decryption cert'
        }
      }
    }
    const expected = {
      requestId: responseModelWithoutSigning.requestId,
      body: {
        host: responseModelWithoutSigning.response.host,
        requestedIdentifierFormat:
          responseModelWithoutSigning.response.requestedIdentifierFormat,
        authnContextIdentifierFormat:
          responseModelWithoutSigning.response.authnContextIdentifierFormat,
        skipRequestCompression:
          responseModelWithoutSigning.response.skipRequestCompression,
        decryption: {
          privateKey:
            responseModelWithoutSigning.response.decryption.privateKey,
          cert: responseModelWithoutSigning.response.decryption.cert
        }
      }
    }
    const sut = new ReadSpProxyConfigPresenterMapper()
    expect(sut.map(responseModelWithoutSigning)).toStrictEqual(expected)
  })
})
