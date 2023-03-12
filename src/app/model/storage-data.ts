export class StorageData {
  public id: number
  public name: string
  public upperStorageId: number

  constructor(id: any, name: string, upperStorageId: number) {
    this.id = id;
    this.name = name;
    this.upperStorageId = upperStorageId;
  }
}
