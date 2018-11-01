import * as Sequelize from 'sequelize';

import { ProvideSingleton, inject } from '../../../ioc';
import { SQLDbConnection } from '../../../config/SQLDbConnection';
import { BaseEntity } from './BaseEntity';
import { TYPES } from './TYPES';

export class UserAttributes {
  public _id: number=0;
  public name: string = "";

}

@ProvideSingleton(TYPES.IEntity)
export class UserEntity extends BaseEntity {
  
  private attributes: Sequelize.DefineAttributes = {
    _id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true }
  };

  constructor(@inject(SQLDbConnection) protected sqlDbConnection: SQLDbConnection) {

    super(
      "user",
       sqlDbConnection,
        this.attributes, 
        { name: { plural: 'users' } } );    
  }
}
