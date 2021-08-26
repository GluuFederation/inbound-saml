import { IGetTrByHostResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostResponse'
import { GetTrByHostPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GetTrByHostPresenterMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { GetTrByHostResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GetTrByHostResponseUseCaseParams'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'

describe('GetTrByHostPresenterMapper', () => {
  it('should map response model to DTO', () => {
    const fakeResponseModel: IResponseModel<GetTrByHostResponseUseCaseParams> =
      {
        requestId: 'fake responseModel requestId',
        response: {
          id: 'fake responseModel TR id',
          selectedSsoService: {
            binding: 'fake responseModel binding',
            location: 'fake responseModel location'
          },
          remoteIdp: {
            id: 'fake responseModel remoteIdp id',
            name: 'fake responseModel remoteIdp name',
            singleSignOnService: [
              {
                binding: 'fake responseModel remoteIdp binding',
                location: 'fake responseModel remoteIdp location'
              }
            ],
            signingCertificates: ['fake responseModel cert']
          }
        }
      }
    const expectedDto: IResponse<IGetTrByHostResponse> = {
      requestId: fakeResponseModel.requestId,
      body: {
        id: fakeResponseModel.response.id,
        selectedSsoService: {
          binding: fakeResponseModel.response.selectedSsoService.binding,
          location: fakeResponseModel.response.selectedSsoService.location
        },
        remoteIdp: {
          id: fakeResponseModel.response.remoteIdp.id,
          name: fakeResponseModel.response.remoteIdp.name,
          singleSignOnService: [
            {
              binding:
                fakeResponseModel.response.remoteIdp.singleSignOnService[0]
                  .binding,
              location:
                fakeResponseModel.response.remoteIdp.singleSignOnService[0]
                  .location
            }
          ],
          signingCertificates:
            fakeResponseModel.response.remoteIdp.signingCertificates
        }
      }
    }
    const sut = new GetTrByHostPresenterMapper()
    expect(sut.map(fakeResponseModel)).toStrictEqual(expectedDto)
  })
  it('should map response models arrays correctly to DTO', () => {
    const fakeResponseModel: IResponseModel<GetTrByHostResponseUseCaseParams> =
      {
        requestId: 'fake responseModel requestId',
        response: {
          id: 'fake responseModel TR id',
          selectedSsoService: {
            binding: 'fake responseModel binding',
            location: 'fake responseModel location'
          },
          remoteIdp: {
            id: 'fake responseModel remoteIdp id',
            name: 'fake responseModel remoteIdp name',
            singleSignOnService: [
              {
                binding: 'fake responseModel remoteIdp binding 1',
                location: 'fake responseModel remoteIdp location 1'
              },
              {
                binding: 'fake responseModel remoteIdp binding 2',
                location: 'fake responseModel remoteIdp location 2'
              }
            ],
            signingCertificates: [
              'fake responseModel cert1',
              'fake responseModel cert 2'
            ]
          }
        }
      }
    const expectedDto: IResponse<IGetTrByHostResponse> = {
      requestId: fakeResponseModel.requestId,
      body: {
        id: fakeResponseModel.response.id,
        selectedSsoService: {
          binding: fakeResponseModel.response.selectedSsoService.binding,
          location: fakeResponseModel.response.selectedSsoService.location
        },
        remoteIdp: {
          id: fakeResponseModel.response.remoteIdp.id,
          name: fakeResponseModel.response.remoteIdp.name,
          singleSignOnService: [
            {
              binding:
                fakeResponseModel.response.remoteIdp.singleSignOnService[0]
                  .binding,
              location:
                fakeResponseModel.response.remoteIdp.singleSignOnService[0]
                  .location
            },
            {
              binding:
                fakeResponseModel.response.remoteIdp.singleSignOnService[1]
                  .binding,
              location:
                fakeResponseModel.response.remoteIdp.singleSignOnService[1]
                  .location
            }
          ],
          signingCertificates: [
            fakeResponseModel.response.remoteIdp.signingCertificates[0],
            fakeResponseModel.response.remoteIdp.signingCertificates[1]
          ]
        }
      }
    }
    const sut = new GetTrByHostPresenterMapper()
    expect(sut.map(fakeResponseModel)).toStrictEqual(expectedDto)
  })
})
