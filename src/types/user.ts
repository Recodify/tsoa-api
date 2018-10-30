export interface UserRequestData {
  /**
   * @format email
   * @pattern ^[a-zA-Z0-9_.+-]+\x40[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$
   */
  email: string;
  /**
   * @minLength 1
   */
  name: string;
  role: string;
  password?: string;
}

export interface UserCreateRequest extends UserRequestData {
  password: string;
}

export interface UserAttributes extends UserRequestData {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;  
}

type UserRequestKeys = (keyof UserRequestData)[];

export const USER_REQUEST_KEYS: UserRequestKeys = [ 'email', 'name', 'role', 'password'];