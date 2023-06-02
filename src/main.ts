import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
		.setTitle('Nest-demo')
		.setDescription('The Nest-demo API description')
		.setVersion('1.0')
		.addTag('Nest-demo')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true
		})
	)
	SwaggerModule.setup('api', app, document)
	await app.listen(3000)
}
bootstrap()
