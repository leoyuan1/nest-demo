import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { LoggerMiddleware } from './logger/logger.middleware'
import { PrismaModule } from 'nestjs-prisma'
import { AuthModule } from './auth/auth.module'

@Module({
	imports: [PrismaModule.forRoot(), AuthModule, UsersModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*')
	}
}
