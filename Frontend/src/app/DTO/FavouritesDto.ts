export class FavouritesDto {
  serial_number : number;
  date: string;

  datetime: string;
  event: string;

  constructor(serial_number: number, date: string, datetime: string, event: string, category: string, venue: string) {
    this.serial_number = serial_number;
    this.date = date;
    this.event = event;
    this.category = category;
    this.venue = venue;
    this.datetime = datetime
  }

  category: string;
  venue: string;

}
