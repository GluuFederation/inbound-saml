/**
 * IMapper for DELIVERY layer
 * Maps from **T** to **Z** types
 */
export interface IDeliveryMapper<T, Z> {
  map: (mapFrom: T) => Z
}
