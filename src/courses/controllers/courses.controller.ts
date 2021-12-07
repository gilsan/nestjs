import { BadRequestException, Body, Controller, Delete, Get, Header, NotFoundException, Param, Post, Put, UseFilters } from "@nestjs/common";
import { ICOURSE } from '../../../share/models';
import { findCourses } from '../../../share/datas';
import { CoursesRepository } from "../repositories/course.repository";
import { HttpExceptionFilter } from "./filters/http.filter";

@Controller('/api/courses/')
@UseFilters(new HttpExceptionFilter())
export class CoursesController {

  courses: ICOURSE[] = [];

  constructor(
    private courseDB: CoursesRepository
  ) { }

  @Get()
  async findAllCourses(): Promise<ICOURSE[]> {
    return this.courseDB.findAll();
  }

  @Get(':courseUrl')
  async findCourse(@Param("courseUrl") courseUrl: string): Promise<ICOURSE> {
    const course = await this.courseDB.findCourse(courseUrl);
    if (!course) {
      throw new NotFoundException("찿을수 없습니다.")
    }
    return course;
  }

  @Put(':courseId')
  @Header('Content-type', 'application/json')
  async updateCourse(@Param("courseId") courseId: string, @Body() changes: Partial<ICOURSE>): Promise<ICOURSE> {

    console.log('updating course', courseId, changes);
    if (changes._id) {
      throw new BadRequestException("Can't update course id")
    }
    return this.courseDB.updateCourse(courseId, changes)
  }


  @Delete(':couseId')
  async deleteCourse(@Param("courseId") courseId: string) {
    return this.courseDB.deleteCourse(courseId);

  }

  @Post()
  async createCourse(@Body() course: Partial<ICOURSE>): Promise<ICOURSE> {
    console.log('[POST]', course);
    return this.courseDB.addCourse(course);

  }


}

function couseId(couseId: any) {
  throw new Error("Function not implemented.");
}
