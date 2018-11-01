import * as Sequelize from 'sequelize';

import { ProvideSingleton, inject, provide, injectable } from '../../../ioc';
import { SQLDbConnection } from '../../../config/SQLDbConnection';
import { BaseEntity } from './BaseEntity';
import { TYPES } from './TYPES';

@ProvideSingleton(TYPES.IEntity)
export class TestEntity extends BaseEntity {
  public entityName: string = 'test';
  protected attributes: Sequelize.DefineAttributes = {
    _id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true }
  };
  protected options: Sequelize.DefineOptions<any> = { name: { plural: 'tests' } }; 

  constructor(@inject(SQLDbConnection) protected sqlDbConnection: SQLDbConnection) {
    super();    
  }  
}
