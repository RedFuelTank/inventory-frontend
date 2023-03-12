export class ItemData {
  public id: number
  public name: string
  public storageId: number
  public image: string = ''
  constructor(id: any, name: string, storageId: number) {
    this.id = id;
    this.name = name;
    this.storageId = storageId;
  }
}
