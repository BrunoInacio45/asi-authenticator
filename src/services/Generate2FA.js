import React from 'react';
import base32 from 'hi-base32';
import crypto from 'crypto';

export default class GenerateFA {

   generateTOTP(secret, window = 0) {
      let counter = Math.floor(Date.now() / 1000);
      counter = Math.floor(counter / 30);
      return this.generateHOTP(secret, counter + window);
   }

   generateHOTP(secret, counter) {
      const buffer = Buffer.alloc(8);
      const decodedSecret = base32.decode.asBytes(secret);

      for (let i = 0; i < 8; i++) {
         buffer[7 - i] = counter & 0xff;
         counter = counter >> 8;
      }

      const hmac = crypto.createHmac("sha1", Buffer.from(decodedSecret));

      hmac.update(buffer);
      const hmacValue = hmac.digest();

      const offset = hmacValue[hmacValue.length - 1] & 0xf;
      const code =
         ((hmacValue[offset] & 0x7f) << 24) |
         ((hmacValue[offset + 1] & 0xff) << 16) |
         ((hmacValue[offset + 2] & 0xff) << 8) |
         (hmacValue[offset + 3] & 0xff);

      return code % 10 ** 6;
   }

   verifyTOTP(token, secret, window = 1) {
      for (let errorWindow = -window; errorWindow <= +window; errorWindow++) {
         const totp = this.generateTOTP(secret, errorWindow);
         if (token.toString() == totp.toString()) {
            return true;
         }
      }
      return false;
   }
}