export class IpDto {
  city?: string;
  country?: string;
  hostname?: string;
  ip?: string | undefined;
  loc?: string;
  org?: string;
  postal?: string;
  region?: string;
  timezone?: string;

  constructor(city: string, country: string, hostname: string, ip: string | undefined, loc: string, org: string, postal: string, region: string, timezone: string) {
    this.city = city;
    this.country = country;
    this.hostname = hostname;
    this.ip = ip;
    this.loc = loc;
    this.org = org;
    this.postal = postal;
    this.region = region;
    this.timezone = timezone;
  }
}

