import { MongoClient } from 'mongodb'
import * as cfg from '../config/env'
const config = cfg.default

export class MongoHelper {
  client: MongoClient
  constructor(public uri: string) {
    this.client = new MongoClient(this.uri)
  }

  async connect(): Promise<void> {
    await this.client.connect()
  }

  /**
   * Connect, create dbs and indexes based on configuration
   * and CLOSE connection
   */
  async prepare(): Promise<void> {
    await this.connect()
    const database = this.client.db(config.database.mongo.dbName)
    const remoteIdps = database.collection(
      config.database.mongo.collections.remoteIdps
    )
    // createIndex
    await remoteIdps.createIndex(
      { 'remoteIdp._id': 1 },
      { unique: true, name: 'remoteIdp._id' }
    )
    await this.client.close()
  }
}
