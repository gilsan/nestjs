import { Controller, Get, Query } from "@nestjs/common";
import { NumericTypes } from "mongoose";
import { LessonsRepositories } from "../repositories/lessons.repositories";


@Controller('lessons')
export class LessonsController {

  constructor(
    private lessonsDB: LessonsRepositories
  ) { }

  @Get()
  async searchLesson(
    @Query('courseId') courseId: string,
    @Query('sortOrder') sortOrder = "asc",
    @Query('pageNumber') pageNumber = 0,
    @Query('pagesize') pagesize = 3
  ) {
    return this.lessonsDB.search(courseId, sortOrder, pageNumber, pagesize);
  }

}