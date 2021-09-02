import { BaseEntity } from '@sp-proxy/entities/types/BaseEntity'

export const isEntity = (value: any): value is BaseEntity<any> => {
  return value instanceof BaseEntity
}
