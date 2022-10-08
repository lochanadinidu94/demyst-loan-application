import { Controller, Body, Res, Post, Get } from '@nestjs/common';
import { ApplicationService } from './application.service';

import { BalanceSheetDto } from './dto/BalanceSheet.dto';
import { LoanRequestDto } from './dto/LoanRequest.dto';

import { BalanceSheetTestDto } from './dto/test.dto';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Post('create-new')
  createNewApplication() {
    return this.applicationService.createNewApplication();
  }

  // @Post('balance-sheet')
  // createNewBalanceSheet(@Body() blanceSheetDto: BalanceSheetDto) {
  //   return this.applicationService.createNewBalanceSheet(blanceSheetDto);
  // }

  @Post('balance-sheet')
  createNewBalanceSheet(@Body() blanceSheetTestDto: BalanceSheetTestDto) {
    return this.applicationService.createNewBalanceSheet(blanceSheetTestDto);
  }

  @Post('lone-request')
  createLoneRequest(@Body() loneRequestDto: LoanRequestDto) {
    return this.applicationService.createLoanRequest(loneRequestDto);
  }
}
