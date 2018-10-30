import { UserAttributes } from './user';
type TokenUserKeys = (keyof UserAttributes)[];
export const TOKEN_USER_KEYS: TokenUserKeys = [ 'id', 'email', 'name' ];
export enum AuthType {
  JWT = 'jwt'
}
export interface TokenPayload {
  id: any;
  name: string;
  email: string;
  scopes: string[];
}
export interface LoginRequest {
  /**
   * @format email
   * @pattern ^[a-zA-Z0-9_.+-]+\x40[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$
   */
  email: string;
  /**
   * @minLength 1
   */
  password: string;
}
export interface AuthResponse {
  token: string;
}