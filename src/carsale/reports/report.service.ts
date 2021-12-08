import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateReportDto } from "./create-report.dto";
import { Report } from "./report.entity";

@Injectable()
export class ReportService {

  constructor(
    @InjectRepository(Report) private repo: Repository<Report>
  ) { }
  create(body: CreateReportDto) {
    const report = this.repo.create(body);
    return this.repo.save(report);
  }
  insert(body: CreateReportDto) {
    // this.repo.createQueryBuilder()

  }



}