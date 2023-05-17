export class FileMustBeMoreThan25Characters extends Error {
  constructor() {
    super('The file field must be more than 25 characters')
  }
}
