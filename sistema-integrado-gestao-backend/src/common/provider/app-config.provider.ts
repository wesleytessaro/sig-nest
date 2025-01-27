import { Provider } from '@nestjs/common';

export const APP_CONFIG = {
  defaultPageSize: 10,
  maxPageSize: 100,
  defaultLocale: 'pt-BR',
};

export const AppConfigProvider: Provider = {
  provide: 'APP_CONFIG',
  useValue: APP_CONFIG,
};
