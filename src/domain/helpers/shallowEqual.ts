export function shallowEqual<T> (objectOne: T, objectTwo: T): boolean {
  if (Object.keys(objectOne).length !== Object.keys(objectTwo).length) {
    return false
  }
  return true
}
