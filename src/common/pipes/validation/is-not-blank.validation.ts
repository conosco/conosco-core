import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotBlank(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isNotBlank',
      target: object.constructor,
      // tslint:disable-next-line: object-literal-shorthand
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && value.trim().length > 0;
        },
      },
    });
  };
}
