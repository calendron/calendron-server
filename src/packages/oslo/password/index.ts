export interface PasswordHashingAlgorithm {
  hash(password: string): Promise<string>;
  verify(hash: string, password: string): Promise<boolean>;
}

export { Argon2id } from './argon2id';

export { Scrypt } from './scrypt';

export { Bcrypt } from './bcrypt';
