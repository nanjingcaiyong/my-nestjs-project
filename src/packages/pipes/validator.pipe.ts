import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ParamterException } from '@/packages/exception';

@Injectable()
export class ValidatorPipe implements PipeTransform {
  /**
   * @description 验证数据
   * @param { value } - 需要验证的数据
   * @param { metatype } - 需要验证的数据类型（DTO）
   */
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const result = errors.map((err) => ({
        cause: err.property,
        description: err.constraints[Object.keys(err.constraints)[0]],
      }));
      throw new ParamterException(result);
    }
    return value;
  }

  private toValidate(metatype: Function) {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
