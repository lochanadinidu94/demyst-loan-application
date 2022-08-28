import { Controller, Body, Res, Post } from '@nestjs/common';
import { ThirdpartysoftwareService } from './thirdpartysoftware.service';

@Controller('thirdpartysoftware')
export class ThirdpartysoftwareController {

    constructor(private trirdparySoftware: ThirdpartysoftwareService) {}

    @Post('return-sheet')
    createNewApplication(@Body() request) {
        return this.trirdparySoftware.createNewApplication(request);
    }
}
