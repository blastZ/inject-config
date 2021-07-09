# Inject Config

Inject global config to specific config

## How To Use

Deafult global config path will be `path.resolve(process.cwd(), './config')`, you can change it
with env `INJECT_CONFIG_PATH`.

```ts
import { inject } from '@blastz/inject-config';

type RedisConfig = {
  host: string;
  port: number;
};

export const redisConfig = inject<RedisConfig>('redis', {
  host: 'localhost',
  port: 6379,
});
```

If your globla config is

```js
module.exports = {
  redis: {
    port: 520,
  },
};
```

When you import config from `redis.config.ts` the result will be

```ts
import { redisConfig } from 'config/redis.config.ts';

console.log(redisConfig);
// => { host: 'localhost', port: 520 }
```

**_CAUSTION:_** when you need to change the global config file path, you need to change env before import `inject` function.

```ts
process.env.INJECT_CONFIG_PATH = '/usr/src/config';

import { inject } from '../src';
```

## Change array merge method

Overwrite the old array config

```ts
type ProxyConfig = {
  target: string;
};

const proxiesConfig = inject<ProxyConfig[]>('proxies', [], {
  arrayMerge: (_, sourceArray) => sourceArray,
});
```

## License

MIT
