export interface ITransformer<FromType, ToType> {
  transform: (from: FromType) => Promise<ToType>
}
