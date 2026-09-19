import {Module} from '@nestjs/common';
import {ConfigModule as NestConfigModule} from "@nestjs/config";
import Joi from "joi";

@Module({
    imports: [NestConfigModule.forRoot({
        validationSchema: Joi.object({
            MONGODB_URI: Joi.string().required()
        })
    })]
})
export class ConfigModule {


}
