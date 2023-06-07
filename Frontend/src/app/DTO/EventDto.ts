export class EventDto {
  artist:string = '';
  buyTicket:string = '';
  genre:string = '';
  localDate:string = '';
  localTime:string = '';
  max:number = 0;
  min:number = 0;
  seat:string = '';
  segment:string = '';
  statusCode:string = '';
  subGenre:string = '';
  subType:string = '';
  type:string = '';
  upcomingEvent:string = '';
  venue: string = '';
  musicArtist: string[] = [];


  constructor(artist: string, buyTicket: string, genre: string, localDate: string, localTime: string, max: number, min: number, seat: string, segment: string, statusCode: string, subGenre: string, subType: string, type: string, upcomingEvent: string, venue: string, musicArtist: string[]) {
    this.artist = artist;
    this.buyTicket = buyTicket;
    this.genre = genre;
    this.localDate = localDate;
    this.localTime = localTime;
    this.max = max;
    this.min = min;
    this.seat = seat;
    this.segment = segment;
    this.statusCode = statusCode;
    this.subGenre = subGenre;
    this.subType = subType;
    this.type = type;
    this.upcomingEvent = upcomingEvent;
    this.venue = venue;
    this.musicArtist = musicArtist;
  }
}
