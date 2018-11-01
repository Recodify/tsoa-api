import {Sequelize} from 'sequelize';

export interface IEntity{
    entityName:string;
    model: Sequelize.Model<any,any>;
    define():void;
    associate():void;
}