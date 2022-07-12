import PlaceForm from "../components/Places/PlaceForm";
import { PlaceProps } from "../models/place";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }: any) {
  async function createPlaceHandler(place: PlaceProps) {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
