import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ILESSON } from "../../../share/models";

@Injectable()
export class LessonsRepositories {

  constructor(
    @InjectModel('Lesson') private modelDB: Model<ILESSON>
  ) { }

  search(
    courseId: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ) {
    console.log("searching for lessons ", courseId, sortOrder, pageNumber, pageSize);
    return this.modelDB.find({
      course: courseId
    }, null, {
      skip: pageNumber * pageSize,
      limit: pageSize,
      sort: {
        seqNo: sortOrder
      }
    })
  }

}