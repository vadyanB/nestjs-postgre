import { SetMetadata } from '@nestjs/common';

export const IsAuthorized = () => SetMetadata('isAuthorized', true);
