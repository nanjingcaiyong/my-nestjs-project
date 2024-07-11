export * from './router.controller';
export * from './user.controller';
export * from './file.controller';

import { RouterController } from './router.controller';
import { UserController } from './user.controller';
import { FileController } from './file.controller';

export const controllers = [RouterController, UserController, FileController];
