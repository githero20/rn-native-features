export interface LocationProps {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface PlaceProps {
  title: string;
  imageUri: string;
  address: string;
  location: LocationProps;
  id: string;
}

export class Place {
  title: string;
  imageUri: string;
  location: LocationProps;
  address?: string | undefined;
  id?: string;

  constructor({
    title,
    imageUri,
    location,
    // address,
    id,
  }: {
    title: string;
    imageUri: string;
    location: LocationProps;
    address?: string;
    id?: string;
  }) {
    this.title = title;
    this.imageUri = imageUri;
    // this.address = location?.address;
    this.location = {
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
    };
    this.id = id;
    // this.id = new Date().toString() + Math.random().toString();
  }
}
