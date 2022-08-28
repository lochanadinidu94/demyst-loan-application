import { Controller, Body, Res, Post , Get} from '@nestjs/common';
import { ApprovalService } from './approval.service'

import { ApprovalRequestDto } from './dto/ApprovalRequest.dto'

@Controller('approval')
export class ApprovalController {

    constructor(private approvalService: ApprovalService) {}

    @Post('approval-request')
    requestApproval(@Body() approvalRequestDto:ApprovalRequestDto) {
        return this.approvalService.requestApproval(approvalRequestDto);
    }
}
