import { SetMetadata } from '@nestjs/common';

export const DefaultValue = (value) => SetMetadata('value', value);