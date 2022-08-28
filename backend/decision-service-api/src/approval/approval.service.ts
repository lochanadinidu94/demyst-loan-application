import { Injectable } from '@nestjs/common';
import { ApprovalRequestDto } from './dto/ApprovalRequest.dto'

@Injectable()
export class ApprovalService {
    requestApproval(approvalRequestDto: ApprovalRequestDto) {
        const {loneAmount, totProfit, avgAssetsValue} = approvalRequestDto
        let preassessmentValue = this.getPreassessmentValue(loneAmount,totProfit,avgAssetsValue )
        let decision = this.getDecision(loneAmount, preassessmentValue, totProfit, avgAssetsValue)

        return {preassessmentValue: preassessmentValue, decision: decision}
    }

    getPreassessmentValue(loneAmount: number, totProfit: number, avgAssetsValue: number, ): number {
        if (avgAssetsValue > loneAmount) return 100;
        if (totProfit > 0) return 60;
        return 20;
    }

    getDecision(loneAmount, preassessmentValue, totProfit, avgAssetsValue){
        return !(avgAssetsValue < loneAmount || totProfit < 0);
    }
}