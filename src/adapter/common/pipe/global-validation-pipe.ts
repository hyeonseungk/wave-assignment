import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestError } from '../../../common/error/custom-error';

@Injectable()
export class GlobalValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value, {
      enableImplicitConversion: false,
    });
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestError(
        `Request가 정해진 형식대로 오지 않았습니다: ${errors}}`,
      );
    }
    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
