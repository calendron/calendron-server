export { ECDSA } from './ecdsa';
export { HMAC } from './hmac';
export { RSASSAPKCS1v1_5, RSASSAPSS } from './rsa';
export { sha1, sha256, sha384, sha512 } from './sha';
export {
  random,
  generateRandomInteger,
  generateRandomString,
  alphabet
} from './random';
export { constantTimeEqual } from './buffer';

export type { ECDSACurve } from './ecdsa';
export type { SHAHash } from './sha';

import type { TypedArray } from '../index';

export interface KeyPair {
  publicKey: ArrayBuffer | TypedArray;
  privateKey: ArrayBuffer | TypedArray;
}
