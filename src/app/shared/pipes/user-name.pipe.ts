import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userName' })
export class UserNamePipe implements PipeTransform {
  transform(
    value: { lastName: string; firstName: string },
    locale: 'en' | 'fr' = 'fr'
  ): string {
    return locale === 'fr'
      ? value.lastName.toUpperCase() +
          ' ' +
          value.firstName.substring(0, 1).toUpperCase() +
          value.firstName.substring(1, value.firstName.length).toLowerCase()
      : `${
          value.lastName.substring(0, 1).toUpperCase() +
          value.lastName.substring(1, value.lastName.length).toLowerCase()
        } ${
          value.firstName.substring(0, 1).toUpperCase() +
          value.firstName.substring(1, value.firstName.length).toLowerCase()
        }`;
  }
}
