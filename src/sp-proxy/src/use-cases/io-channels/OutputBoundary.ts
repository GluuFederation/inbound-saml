/**
 * **T** is the specific IResponseModel
 */
export interface OutputBoundary<T> {
  present: (response: T) => Promise<void>
}
