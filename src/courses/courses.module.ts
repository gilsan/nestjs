import { Module } from "@nestjs/common";
import { CoursesController } from "./controllers/courses.controller";
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesSchema } from "./schema/courses.shcema";
import { CoursesRepository } from "./repositories/course.repository";
import { LessonsSchema } from "./schema/lessons.schema";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CoursesSchema },
      { name: 'Lesson', schema: LessonsSchema },
    ])
  ],
  controllers: [
    CoursesController
  ],
  providers: [
    CoursesRepository
  ]
})
export class CourseModule {

}