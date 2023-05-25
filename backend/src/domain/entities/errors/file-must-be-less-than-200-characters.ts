export class FileMustBeLessThan200Characters extends Error {
  constructor() {
    super("The field file must be less than 200 characters");
  }
}
