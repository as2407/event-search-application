export  class  VenueDto {
  address:string;
  city:string;
  image: string;
  postalCode: string;
  state: string;
  url: string;
  phone: string;
  openHours: string;
  generalRule: string;
  childRule: string;
  constructor(address: string, city: string, image: string, postalCode: string, state: string, url: string, phone: string, openHours: string, generalRule: string, childRule: string) {
    this.address = address;
    this.city = city;
    this.image = image;
    this.postalCode = postalCode;
    this.state = state;
    this.url = url;
    this.phone = phone;
    this.openHours = openHours;
    this.generalRule = generalRule;
    this.childRule = childRule;
  }




}
