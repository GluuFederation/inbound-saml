/**
 * T is the object type to be mapped FROM
 * Z is the returning mapped object type
 */
export interface IMapper<T, Z> {
  map: (mappedFrom: T) => Z
}
