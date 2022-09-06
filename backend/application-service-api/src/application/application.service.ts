import { Injectable } from '@nestjs/common';

import { DbConnectionModule } from './db/db-connection.module';
import { BalanceSheetDto } from './dto/BalanceSheet.dto';
import { UpdateApplicationDto } from './dto/UpdateApplication.dto';
import { LoanRequestDto } from './dto/LoanRequest.dto';

import axios from 'axios';

@Injectable()
export class ApplicationService {
  constructor(private dbConnection: DbConnectionModule) {}

  async createNewApplication() {
    const applicationId = await this.dbConnection.createNewApplicationData();
    if (Number(applicationId) > 1) return applicationId;
  }

  async updateApplication(updateApplication: UpdateApplicationDto) {
    return await this.dbConnection.updateApplication(updateApplication);
  }

  async getUserId(blanceSheetDto: BalanceSheetDto) {
    const user = {
      userName: blanceSheetDto.userName,
      userMobile: blanceSheetDto.userMobile,
      userEmail: blanceSheetDto.userEmail,
    };

    return axios({
      method: 'post',
      url: 'http://gateway:3000/user/create-user',
      data: user,
    });
  }

  async getDataSheet(softwareType) {
    return axios({
      method: 'post',
      url: 'http://gateway:3000/thirdpartysoftware/return-sheet',
      data: { softwareType: softwareType },
    });
  }

  async createNewBalanceSheet(blanceSheetDto: BalanceSheetDto) {
    let userId = blanceSheetDto.userId;
    if (userId == 0) {
      const userIdResp = await this.getUserId(blanceSheetDto);
      userId = userIdResp?.data;
    }

    const application = {
      id: blanceSheetDto.id,
      userId: userId,
      states: '',
    };

    const historyResponse = await this.getDataSheet(
      blanceSheetDto.softwareType,
    );

    const balanceSheet = {
      profile: {
        ...(await this.updateApplication(application)),
        userName: blanceSheetDto.userName,
        amount: blanceSheetDto.loneAmount,
      },
      sheet: historyResponse?.data,
    };

    return balanceSheet;
  }

  async getDecision(loneAmount, totProfit, avgAssetsValue) {
    return axios({
      method: 'post',
      url: 'http://gateway:3000/approval/approval-request',
      data: {
        loneAmount: loneAmount,
        totProfit: totProfit,
        avgAssetsValue: avgAssetsValue,
      },
    });
  }

  async createLoanRequest(loneRequestDto: LoanRequestDto) {
    const { loneAmount, totProfit, avgAssetsValue } = loneRequestDto;
    const decisionResponse = await this.getDecision(
      loneAmount,
      totProfit,
      avgAssetsValue,
    );
    return decisionResponse?.data;
  }
}
