export class NameShouldNotBeEmpty extends Error {
  constructor() {
    super('The field name should not be empty')
  }
}
