import * as Sequelize from 'sequelize';

import constants from './constants';
import { Logger } from './Logger';
import { ProvideSingleton, inject, multiInject } from '../ioc';
import { SQLDbConnection } from './SQLDbConnection';
import * as Entities from '../repositories/sql/entities';

@ProvideSingleton(SQLSetupHelper)
export class SQLSetupHelper {

  constructor(
    @inject(SQLDbConnection) private sqlDbConnection: SQLDbConnection,
    @multiInject(Entities.TYPES.IEntity) private entities: Entities.IEntity[] // tslint:disable-line
  ) {
    console.log('Number of entities: ' + entities.length);
    entities.forEach(x => x.define());
  }

  public async rawQuery<T>(query: string): Promise<T> {
    return this.sqlDbConnection.db.query(query, { raw: true });
  }

  public async sync(options?: Sequelize.SyncOptions): Promise<void> {
    await this.sqlDbConnection.db.authenticate();
    if (constants.SQL.dialect === 'mysql') await this.rawQuery('SET FOREIGN_KEY_CHECKS = 0');
    Logger.log(
      `synchronizing: tables${options ? ` with options: ${JSON.stringify(options)}` : ''}`
    );
    await this.sqlDbConnection.db.sync(options);
  }
}
