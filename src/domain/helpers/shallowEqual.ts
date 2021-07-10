/* eslint-disable no-mixed-operators */
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
    const valueOne = objectOne[key]
    const valueTwo = objectTwo[key]
    const areObjects = isObject(valueOne) && isObject(valueTwo)
    if (
      areObjects && !shallowEqual(valueOne, valueTwo) ||
      !areObjects && valueOne !== valueTwo
    ) {
      return false
    }
  }
  return true
}

function isObject (object: object): boolean {
  return object != null && typeof object === 'object'
}
