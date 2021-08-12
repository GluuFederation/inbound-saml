import { MongoHelper } from '@sp-proxy/interface-adapters/data/helpers/MongoHelper'
import * as cfg from '../config/env'
const config = cfg.default

export const makeMongoHelper = (): MongoHelper => {
  return new MongoHelper(config.database.mongo.uri)
}
