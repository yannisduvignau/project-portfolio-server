import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AboutModule } from './about/about.module';
import { ExperienceModule } from './experience/experience.module';
import { ProjectModule } from './project/project.module';
import { PassionModule } from './passion/passion.module';
import { NavigationModule } from './navigation/navigation.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { SkillModule } from './skill/skill.module';
import * as cors from 'cors';
import { SkillCategoryModule } from './skill-category/skill-category.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    AboutModule,
    ExperienceModule,
    ProjectModule,
    PassionModule,
    NavigationModule,
    TestimonialModule,
    SkillModule,
    SkillCategoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors({
          origin: 'http://localhost:3000',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Authorization'],
          credentials: true,
        }),
      )
      .forRoutes('*');
  }
}
