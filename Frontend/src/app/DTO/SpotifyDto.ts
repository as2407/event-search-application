export class SpotifyDto {
  name: string;
  followers: number;
  popularity: number;
  link: string;
  image: string;
  album: string[];


  constructor(name: string, followers: number, popularity: number, link: string, image: string, album: string[]) {
    this.name = name;
    this.followers = followers;
    this.popularity = popularity;
    this.link = link;
    this.image = image;
    this.album = album;
  }
}
