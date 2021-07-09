import path from 'path';
import deepmerge from 'deepmerge';

let globalConfig: Record<string, unknown> = {};

const globalConfigPath =
  process.env.INJECT_CONFIG_PATH || path.resolve(process.cwd(), './config');

try {
  globalConfig = require(globalConfigPath);
} catch (err) {
  console.error(
    `ERR_INJECT_CONFIG: global config '${globalConfigPath}' not found`,
  );
}

function getDefault(config: unknown) {
  if (Array.isArray(config)) {
    return [];
  }

  return {};
}

export function inject<T>(
  configName: string,
  config: T,
  options?: deepmerge.Options,
) {
  return deepmerge<T>(
    config,
    (globalConfig[configName] as T) || getDefault(config),
    options,
  );
}
