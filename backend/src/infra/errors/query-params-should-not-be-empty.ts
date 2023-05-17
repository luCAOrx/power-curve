export class QueryParamsShouldNotBeEmpty extends Error {
  constructor() {
    super('The query params should not be empty')
  }
}
