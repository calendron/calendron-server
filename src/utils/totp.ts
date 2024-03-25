export function parseOTPAuthURI(uri: string) {
  const otpAuthRegex =
    /otpauth:\/\/totp\/([^:]+):([^?]+)\?secret=([^&]+)&issuer=([^&]+)(?:&algorithm=([^&]+)&digits=(\d+)&period=(\d+))?/;
  const matches = uri.match(otpAuthRegex);

  if (matches) {
    const data: {
      name: string;
      identity: string;
      secret: string;
      digits?: '6' | '7' | '8';
      period?: '30' | '60';
      algorithm?: 'SHA1' | 'SHA256' | 'SHA512';
      issuer: string;
    } = {
      name: matches[1],
      identity: matches[2],
      secret: matches[3],
      issuer: matches[4]
    };

    data.algorithm = matches[5]
      ? (matches[5] as 'SHA1' | 'SHA256' | 'SHA512')
      : 'SHA1';
    data.digits = matches[6]
      ? (String(parseInt(matches[6])) as '6' | '7' | '8')
      : '6';
    data.period = matches[7] ? (matches[7] as '30' | '60') : '30';

    return data;
  } else {
    throw new Error('Invalid OTP Auth URI');
  }
}
