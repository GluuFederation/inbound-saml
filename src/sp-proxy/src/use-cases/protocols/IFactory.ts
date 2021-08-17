export interface IFactory<PropsType, Createdtype> {
  make: (props: PropsType) => Promise<Createdtype>
}
