import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";
import { ICOURSE } from "../../../share/models";


@Injectable()
export class CoursesRepository {

  constructor(@InjectModel('Course') private courseModel: Model<ICOURSE>) { }

  async findAll(): Promise<ICOURSE[]> {
    return this.courseModel.find();
  }

  async findCourse(courseUrl: string): Promise<ICOURSE> {
    return this.courseModel.findOne({ url: courseUrl });
  }

  async updateCourse(courseId: string, changes: Partial<ICOURSE>): Promise<ICOURSE> {
    return this.courseModel.findOneAndUpdate({ _id: courseId }, changes, { new: true });
  }

  async deleteCourse(courseId: string): Promise<any> {
    return this.courseModel.deleteOne({ _id: courseId });
  }

  async addCourse(course: Partial<ICOURSE>): Promise<ICOURSE> {
    const newCourse = new this.courseModel(course);
    await newCourse.save();
    return newCourse.toObject({ versionKey: false })
  }

}