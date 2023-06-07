export class searchModelClass {
  keyword: string;
  distance:number;
  category: string;
  location:string;
  autoLocation : boolean

  constructor(keyword: string, distance: number, category: string, location: string, autoLocation: boolean) {
    this.keyword = keyword;
    this.distance = distance;
    this.category = category;
    this.location = location;
    this.autoLocation = autoLocation;
  }
}
