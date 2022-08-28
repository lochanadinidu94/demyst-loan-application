import {ApprovalService} from '../approval.service'

describe('Loan approval tests', () => {

    let approvalService: ApprovalService;

    beforeEach(() => {
        approvalService = new ApprovalService();
    });

    test('Should pass the loan application when loan request amount is less than the profit', () => {
        expect(approvalService.requestApproval(
            {
                loneAmount: "1232",
                totProfit: 199950,
                avgAssetsValue: 63205
            }
        ).decision).toBe(true);
    })
})