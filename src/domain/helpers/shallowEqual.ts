export function shallowEqual<T> (objectOne: T, objectTwo: T): boolean {
  if (Object.keys(objectOne) !== Object.keys(objectTwo)) {
    return false
  }
  return true
}
