import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  ImagePickerResult,
  ImageInfo,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

interface ImagePickerProps {
  onTakeImage: Function;
}

const ImagePicker = ({ onTakeImage }: ImagePickerProps) => {
  const [pickedImage, setPickedImage] = useState("");
  const [cameraPermissionInfo, requestPermissionInfo] = useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermissionInfo();

      return permissionResponse.granted;
    }

    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert("Permission denied!", "You need to grant permissions first.");
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    const image: ImagePickerResult = await launchCameraAsync({
      allowsEditing: true,
      // aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.cancelled) {
      const { uri } = image as ImageInfo;
      setPickedImage(uri);
      onTakeImage(uri);
    }
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    // height: 200 ,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
