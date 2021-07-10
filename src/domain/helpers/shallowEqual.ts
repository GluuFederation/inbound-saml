interface comparableObject {
  [index: string]: any
}
export function shallowEqual (objectOne: comparableObject, objectTwo: comparableObject): boolean {
  const objectOneKeys = Object.keys(objectOne)
  const objectTwoKeys = Object.keys(objectTwo)

  if (objectOneKeys.length !== objectTwoKeys.length) {
    return false
  }
  for (const key of objectOneKeys) {
    if (objectOne[key] !== objectTwo[key]) {
      return false
    }
  }
  return true
}
