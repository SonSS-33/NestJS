export class PaginationModel {
  public readonly page: number;
  public readonly limit: number;

  constructor(page: number = 1, limit: number = 10) {
    this.page = page;
    this.limit = limit;
  }
}
