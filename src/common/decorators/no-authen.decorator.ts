import { SetMetadata } from '@nestjs/common';

export const NoAuthentication = () => SetMetadata('noAuthentication', true);