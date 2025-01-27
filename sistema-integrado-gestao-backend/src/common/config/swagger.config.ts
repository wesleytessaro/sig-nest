import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { SwaggerTags } from './swagger/tags.config';
import { SwaggerAuth } from './swagger/auth.config';
import { SwaggerUIConfig } from './swagger/ui.config';
import { CadeiaValorModule } from 'src/modules/cadeia-valor/cadeia-valor.module';

export function setupSwagger(app: INestApplication): void {
  const builder = new DocumentBuilder()
    .setTitle('Sistema API')
    .setDescription('Documentação da API do Sistema')
    .setVersion('1.0')
    .addBearerAuth(SwaggerAuth.JWT, 'JWT-auth');

  // Adiciona todas as tags automaticamente
  Object.values(SwaggerTags).forEach((tag) => {
    builder.addTag(tag.name, tag.description);
  });

  const config = builder.build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [
      CadeiaValorModule,
      // Outros módulos que você queira incluir na documentação
    ],
  });

  SwaggerModule.setup('api-docs', app, document, SwaggerUIConfig);
}
