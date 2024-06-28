import { Exception } from './exception';

export class ParamterException extends Exception {
  constructor(public errors: any[]) {
    super(errors);
  }
}
