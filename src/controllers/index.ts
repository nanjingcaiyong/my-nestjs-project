export * from './router.controller';
export * from './user.controller';

import { RouterController } from './router.controller';
import { UserController } from './user.controller';

export const controllers = [RouterController, UserController];
