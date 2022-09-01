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

    test('Should return Pre assessment (100) according to lone amount, total profit and avg Assets Value', () => {
        expect(approvalService.getPreassessmentValue(5000, 199950,63205)).toBe(100);
    })
    test('Should return Pre assessment (60) according to lone amount, total profit and avg Assets Value', () => {
        expect(approvalService.getPreassessmentValue(0, 199950,0)).toBe(60);
    })

    test('Should return the decision (TRUE) according to lone amount, total profit and avg Assets Value', () => {
        expect(approvalService.getDecision(5000, 199950,63205)).toBe(true);
    })
    test('Should return the decision (FALSE) according to lone amount, total profit and avg Assets Value', () => {
        expect(approvalService.getDecision(199951, 199950,63205)).toBe(false);
    })
})