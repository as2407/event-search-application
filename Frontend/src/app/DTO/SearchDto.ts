export class SearchDto {
  name: string;
  eventId: string;
  localDate: string;
  localTime: string;
  imageURL: string;
  genre: string;
  venue: string;
  

  constructor(name: string, eventId: string, localDate: string, localTime: string, imageURL: string, genre: string, venue: string) {
    this.name = name;
    this.eventId = eventId;
    this.localDate = localDate;
    this.localTime = localTime;
    this.imageURL = imageURL;
    this.genre = genre;
    this.venue = venue;
  }
}
