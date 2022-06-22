interface LocationProps {
  latitude: number;
  longitude: number;
}

interface PlaceProps {
  title: string;
  imageUri: string;
  address: string;
  location: LocationProps;
}

class Place {
  title: string;
  imageUri: string;
  address: string;
  location: { latitude: number; longitude: number };
  id: string;

  constructor({
    title,
    imageUri,
    address,
    location,
    id,
  }: {
    title: string;
    imageUri: string;
    address: string;
    location: { latitude: number; longitude: number };
    id: string;
  }) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}
