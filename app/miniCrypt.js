'use strict';

import { randomBytes, pbkdf2Sync, timingSafeEqual } from 'crypto';

export class MiniCrypt {
  constructor(its = 1e5, keyL = 64, saltL = 16, digest = 'sha256') {
    this.its = its;
    this.keyL = keyL;
    this.saltL = saltL;
    this.digest = digest;
  }

  hash(pw) {
    const salt = randomBytes(this.saltL).toString('hex');
    const hash = pbkdf2Sync(pw, salt, this.its, this.keyL, this.digest).toString('hex');
    return [salt, hash];
  }

  check(pw, salt, hash) {
    return timingSafeEqual(pbkdf2Sync(pw, salt, this.its, this.keyL, this.digest), Buffer.from(hash, 'hex'));
  }
}
