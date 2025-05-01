import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1746085401525_2824',
  koa: {
    port: 7001,
    globalPrefix: '/api',
  },
  jwt: {
    secret: 'yourVerySecretKeyyasd',
    sign: {
      expiresIn: '2d',
    },
    verify: {
      // verifyOptions
    },
    decode: {
      // decodeOptions
    },
  },
  swagger: {
    auth: {
      authType: 'bearer',
    },
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/',
        dir: './public',
        alias: {
          '/': '/index.html',
        },
      },
    },
  },
} as MidwayConfig;
