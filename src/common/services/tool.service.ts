import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ToolService {

  async encrypt(value) {
    const saltOrRounds = 10;
    return await bcrypt.hash(value, saltOrRounds);
  }
  async verify(password,hash) {
    const saltOrRounds = 10;
    return await bcrypt.compare(password, hash);
  }
}