/**
 * Mapper to be used in DATA layer
 * **T** is the object type to be mapped FROM
 * **Z** is object type to be returned
 */
export interface IDataMapper<T, Z> {
  map: (mappedFrom: T) => Promise<Z>
}
