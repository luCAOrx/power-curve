export class FileShouldNotBeEmpty extends Error {
  constructor() {
    super('The field file should not be empty')
  }
}
