import { v4 as uuidv4 } from 'uuid'

export abstract class Entity<T> {
  protected readonly _id: string
  public props: T

  constructor (props: T, id?: string) {
    this._id = id ?? uuidv4()
    this.props = props
  }

  // Entities are compared based on their referential
  // equality.
  public equals (entity: Entity<T>): boolean {
    const isEntity = (v: any): v is Entity<any> => {
      return v instanceof Entity
    }
    // eslint-disable-next-line eqeqeq
    if (entity == null || entity == undefined) {
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
