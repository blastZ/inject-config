import path from 'path';

process.env.INJECT_CONFIG_PATH = path.resolve(process.cwd(), './test/config');

import { inject } from '../src';

type LoggerConfig = {
  consoleLevel: string;
};

type RedisConfig = {
  host: string;
  port: number;
};

test('inject', () => {
  const loggerConfig = inject<LoggerConfig>('logger', {
    consoleLevel: 'info',
  });

  const redisConfig = inject<RedisConfig>('redis', {
    host: 'localhost',
    port: 6379,
  });

  expect(loggerConfig.consoleLevel).toEqual('error');

  expect(redisConfig.host).toEqual('localhost');
  expect(redisConfig.port).toEqual(5252);
});
