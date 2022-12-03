import { ConfigFactory, ConfigObject } from '@nestjs/config';

import youtube from './youtube.config';

export * from './enums';
export * from './types';

export const configs: ConfigFactory<ConfigObject>[] = [youtube];
