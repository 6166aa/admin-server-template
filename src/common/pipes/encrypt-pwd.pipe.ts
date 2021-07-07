import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ToolService } from '../services/tool.service';

@Injectable()
export class EncryptPwdPipe implements PipeTransform<object, any> {
  constructor(private readonly toolService:ToolService){}
  async transform(value: object, metadata: ArgumentMetadata):Promise<object> {
    if(metadata.type==='body'){
      for (const key in value) {
        if(key.match(/pwd|password/i)){
          value[key] = await this.toolService.encrypt(value[key]);
        }
      }
    }
    return value;
  }
}