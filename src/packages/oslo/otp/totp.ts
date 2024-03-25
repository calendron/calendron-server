import { TimeSpan } from '../index';
import { generateHOTP } from './hotp';

import type { TypedArray } from '../index';

export class TOTPController {
  private digits: number;
  private period: TimeSpan;

  constructor(options?: { digits?: number; period?: TimeSpan }) {
    this.digits = options?.digits ?? 6;
    this.period = options?.period ?? new TimeSpan(30, 's');
  }

  public async generate(secret: ArrayBuffer | TypedArray): Promise<string> {
    const counter = Math.floor(Date.now() / this.period.milliseconds());
    return await generateHOTP(secret, counter, this.digits);
  }

  public async verify(
    totp: string,
    secret: ArrayBuffer | TypedArray
  ): Promise<boolean> {
    const expectedTOTP = await this.generate(secret);
    return totp === expectedTOTP;
  }
}
