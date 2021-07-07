import { readFileSync } from "fs";
import { join } from "path";

const fs = require('fs');
const privateKey = readFileSync(join(__dirname,'../../keys/privateKey.pem'));
const publicKey = readFileSync(join(__dirname,'../../keys/privateKey.pem'));
export const jwtConstants = {
  //secret:'对称加密密钥字符串',
  privateKey,
  publicKey
};