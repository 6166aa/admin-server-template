import { Global, Module } from '@nestjs/common';
import { ToolService } from 'src/common/services/tool.service';
@Global()
@Module({
  providers: [ToolService],
  exports: [ToolService]
})
export class ToolModule { }
