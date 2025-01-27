export interface SwaggerUIOptions {
  swaggerOptions: {
    persistAuthorization: boolean;
    docExpansion: string;
    filter: boolean;
    showRequestDuration: boolean;
    tryItOutEnabled: boolean;
    tagsSorter: string;
    operationsSorter: string;
  };
  customSiteTitle: string;
  customCss: string;
  customfavIcon: string;
}
export const SwaggerUIConfig: SwaggerUIOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'none',
    filter: true,
    showRequestDuration: true,
    tryItOutEnabled: true,
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
  },
  customSiteTitle: 'Sistema API Documentation',
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info { margin: 30px 0 }
    .swagger-ui .scheme-container { margin: 30px 0 }
  `,
  customfavIcon: '../favicon.ico',
};
