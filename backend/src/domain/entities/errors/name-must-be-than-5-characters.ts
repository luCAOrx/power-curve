export class NameMustBeThan5Characters extends Error {
  constructor() {
    super('The field name must be than 5 characters')
  }
}
