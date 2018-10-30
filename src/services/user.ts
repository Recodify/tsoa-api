import { Op, FindOptions } from 'sequelize';

import { ProvideSingleton, inject } from '../config/ioc';
import { UserInstance, UserModel } from '../models/user';
import { NotFound, Unauthorized } from '../types/api-error';
import { UserRequestData } from '../types/user';
import { TYPES } from '../types/ioc';
import { PaginationParams, PaginationResponse } from '../types/pagination';
import { LoginRequest } from '../types/authentication';

@ProvideSingleton(UserService)
export class UserService {

  constructor(@inject(TYPES.UserModel) protected userModel: UserModel) {
  }

  public async getById(id: number): Promise<UserInstance> {
    const user = await this.userModel.findById(id);

    if (! user) {
      throw new NotFound();
    }

    return user;
  }

  public async create(userData: UserRequestData): Promise<UserInstance> {
    return await this.userModel.create(userData);
  }

  public async update(id: number, userData: UserRequestData): Promise<UserInstance> {
    const user = await this.getById(id);

    return await user.update(userData);
  }

  public async delete(id: number): Promise<void> {
    const user = await this.getById(id);

    return await user.destroy();
  }

  public async search(params: PaginationParams): Promise<PaginationResponse<UserInstance[]>> {
    const { query, limit = 100, page = 1, sortBy, sortDirection = 'ASC' } = params;

    const options: FindOptions<UserModel> = {
      limit,
      offset: (page - 1) * limit
    };

    if (query) {
      options.where = {
        [Op.or]: [
          { email: { [Op.like]: `%${query}%` } },
          { name: { [Op.like]: `%${query}%` } }
        ]
      };
    }

    if (sortBy) {
      options.order = [ [ sortBy, sortDirection ] ];
    }

    const { rows, count } = await this.userModel.findAndCount(options);

    return { count, items: rows };
  }

  public async authenticate(login: LoginRequest) {      
    const user = await this.userModel.findOne({where: {email: login.email}});
      
    if (! user) {
      throw new Unauthorized();
    }
    // TODO: implement check here
    const result = true; // await user.checkPassword(login.password);
    if (! result) {
      throw new Unauthorized();
    }
    return user;
  }
}