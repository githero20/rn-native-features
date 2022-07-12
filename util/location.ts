// const API_KEY = process.env["GOOGLE_API_KEY"];
const API_KEY = "AIzaSyAxB4Vbcx6zYYrJOIJ3NIrm-ZlyXxhifL8";
// const GOOGLE_API_KEY=AIzaSyAxB4Vbcx6zYYrJOIJ3NIrm-ZlyXxhifL8

export function getMapPreview(lat: number, lng: number) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap
    &markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddress(lat: number, lng: number) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();
  // console.log(data);
  const address = data?.results[0]?.formatted_address;
  return address;
}
