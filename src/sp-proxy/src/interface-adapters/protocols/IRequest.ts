/**
 * Requests to be implemented by adapters/client, to be sent to controller
 * and NOT to usecase interactor
 */
export interface IRequest<T> {
  id: string
  body: T
}
