import { deeplyEqual } from '@get-saml-metadata/entities/helpers/deeplyEqual'

export interface ValueObjectProps {
  [index: string]: any
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T

  constructor(props: T) {
    this.props = Object.freeze(props)
  }

  /**
   * Deeply compare only props of valueObject
   * @param vo
   * @returns {boolean} - True if deeplyEqual
   */
  public equal(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false
    }
    return deeplyEqual(this.props, vo.props)
  }
}
