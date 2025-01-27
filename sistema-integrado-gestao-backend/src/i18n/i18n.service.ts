// src/i18n/i18n.service.ts
import { Injectable } from '@nestjs/common';
import ptBR from './messages/pt-BR';

type MessageParams = Record<string, string | number>;

@Injectable()
export class I18nService {
  private readonly defaultLocale = 'pt-BR';
  private readonly messages = {
    'pt-BR': ptBR,
  };
  private currentLocale: string = this.defaultLocale;

  setLocale(locale: string): void {
    if (this.messages[locale]) {
      this.currentLocale = locale;
    }
  }

  translate(key: string, params?: MessageParams): string {
    const message = this.getMessage(key, this.currentLocale);
    return this.replaceParams(message || key, params);
  }

  private getMessage(key: string, locale: string): string | null {
    try {
      const keys = key.split('.');
      let message = this.messages[locale];

      for (const k of keys) {
        if (message === undefined) break;
        message = message[k];
      }

      return typeof message === 'string' ? message : null;
    } catch {
      return null;
    }
  }

  private replaceParams(message: string, params?: MessageParams): string {
    if (!params) return message;
    return message.replace(
      /{(\w+)}/g,
      (_, key) => params[key]?.toString() || `{${key}}`,
    );
  }
}
