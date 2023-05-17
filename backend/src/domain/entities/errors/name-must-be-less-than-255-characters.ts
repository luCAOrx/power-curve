export class NameMustBeLessThan255Characters extends Error {
  constructor() {
    super('The field name must be less than 255 characters')
  }
}
