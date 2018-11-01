import { decorate, injectable } from 'inversify';
import * as Sequelize from 'sequelize';

import { SQLDbConnection } from '../../../config/SQLDbConnection';
import { Logger } from '../../../config/Logger';
import { IEntity } from './IEntity';
import { any } from 'bluebird';


export abstract class BaseEntity<TInstance, TAttribute> implements IEntity {

  private _model!: Sequelize.Model<TInstance, TAttribute>

  protected constructor(
    private _entityName: string,     
    private sqlDbConnection: SQLDbConnection, 
    private options: Sequelize.DefineOptions<any>,
    private attributes: Sequelize.DefineAttributes) {    
  }

  public get entityName(){
    return this._entityName;
  }

  public get model(){
    return this._model;
  }

  public define(): void {
    this._model = this.sqlDbConnection.db.define(this.entityName, this.attributes, this.options);
  }

  public associate(): void {    
  }

  protected sync(options?: Sequelize.SyncOptions): Promise<any> {
    Logger.log(
      `synchronizing: ${this.entityName}${options ? ` with options: ${JSON.stringify(options)}` : ''}`
    );
    return this.model.sync(options) as any;
  }
}

decorate(injectable(), BaseEntity);
