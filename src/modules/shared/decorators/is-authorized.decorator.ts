import { SetMetadata } from '@nestjs/common';

export function IsAuthorized(skipGlobalGuard: boolean) {
  return (
    target: { [key: string]: any },
    key: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    SetMetadata('skipGlobalGuard', skipGlobalGuard)(target, key, descriptor);

    if (descriptor) {
      return descriptor;
    }
    return target;
  };
}
