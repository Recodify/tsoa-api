import * as Sequelize from 'sequelize';

import { UserAttributes } from '../types/user';
import { ProvideSingleton } from '../config/ioc';
import { TYPES } from '../types/ioc';

export type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;
export type UserModel = Sequelize.Model<UserInstance, UserAttributes>;

export interface IModelFactory<TModel> {
  create(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): TModel;
}

@ProvideSingleton(TYPES.ModelFactory)
export class UserModelFactory implements IModelFactory<UserModel> {
  public create(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel {
    const model = sequelize.define<UserInstance, UserAttributes>('User', {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      role: { type: DataTypes.STRING },
      password: {type: DataTypes.STRING}
    }, {});

    model.associate = function (models: Sequelize.Models) {
      // associations can be defined here
    };

    return model;
  }
}