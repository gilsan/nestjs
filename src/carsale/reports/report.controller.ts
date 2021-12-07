import { Controller, Get, Post, Body, Param, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { CreateReportDto } from "./create-report.dto";
import { ReportService } from "./report.service";


@Controller('reports')
export class ReportController {

  constructor(
    private reportService: ReportService
  ) { }


  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.reportService.create(body)

  }




}