import React from 'react';
import Base32Enconde from 'base32-encode'

export default function Generate2FA(secret) {

   const intervalRefresh = 30;

   getCode = (key, interval) => {
      const { buffer } = new Uint8Array([0x74, 0x65, 0x73, 0x74])
      var originalKey = base32.base32Encode(buffer, 'Crockford')
   }

   var input = Math.round((new Date().getTime() / intervalRefresh)).toString();
   console.log(input)
}
