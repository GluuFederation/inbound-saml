/* eslint-disable no-mixed-operators */
export interface comparableObject {
  [index: string]: any
}
export function deeplyEqual(
  objectOne: comparableObject,
  objectTwo: comparableObject
): boolean {
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
      (areObjects && !deeplyEqual(valueOne, valueTwo)) ||
      (!areObjects && valueOne !== valueTwo)
    ) {
      return false
    }
  }
  return true
}

function isObject(object: object): boolean {
  return object != null && typeof object === 'object'
}
