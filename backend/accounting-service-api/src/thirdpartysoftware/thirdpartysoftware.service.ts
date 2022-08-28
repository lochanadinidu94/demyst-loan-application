import { Injectable } from '@nestjs/common';
import { sheet } from './mock-data/data'

@Injectable()
export class ThirdpartysoftwareService {
    createNewApplication(request) {
        if(request.softwareType == 'Xero'){
            return sheet
        } else if(request.softwareType == 'MYOB'){
            return sheet
        }
    }
}
