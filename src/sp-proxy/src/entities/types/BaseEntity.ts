import { randomUUID } from 'crypto'

export abstract class BaseEntity<T> {
  protected readonly _id: string
  public props: T

  constructor(props: T, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
  }

  // Entities are compared based on their referential
  // equality.
  public equals(entity: BaseEntity<T>): boolean {
    const isEntity = (v: any): v is BaseEntity<any> => {
      return v instanceof BaseEntity
    }
    if (entity === null || entity === undefined) {
      return false
    }
    if (this === entity) {
      return true
    }
    if (!isEntity(entity)) {
      return false
    }
    return this._id === entity._id
  }
}
