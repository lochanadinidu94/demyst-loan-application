import { ThirdpartysoftwareService } from '../thirdpartysoftware.service';
import { sheet } from '../mock-data/data';

describe('Mock datasource tests', () => {
  let thirdpartysoftware: ThirdpartysoftwareService;

  beforeEach(() => {
    thirdpartysoftware = new ThirdpartysoftwareService();
  });

  test('Should pass mock datasource according to softwareType - MYOB', () => {
    expect(
      thirdpartysoftware.createNewApplication({ softwareType: 'MYOB' }),
    ).toBe(sheet);
  });

  test('Should pass mock datasource according to softwareType - Xero', () => {
    expect(
      thirdpartysoftware.createNewApplication({ softwareType: 'Xero' }),
    ).toBe(sheet);
  });
});
