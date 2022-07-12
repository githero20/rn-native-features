import * as SQLite from "expo-sqlite";
import { Place, PlaceProps } from "../models/place";

const database = SQLite.openDatabase("places.db");

// you don't store files on db, just path to files i.e. imageUri
export function init() {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng TEXT NOT NULL
            )`,
        [],
        () => {
          resolve();
        },
        (_, error): any => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export const insertPlace = (place: PlaceProps) => {
  const promise = new Promise<any>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.latitude,
          place.location.longitude,
        ],
        (_, result) => {
          // _ to take a parameter but not using it, i.e. the transaction details
          console.log(result);
          resolve(result);
        },
        (_, error): any => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export function fetchPlaces() {
  const promise = new Promise<any>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          // _ to take a parameter but not using it, i.e. the transaction details
          let places = [];
          // console.log(result);
          for (const dp of result.rows._array) {
            places.push(
              new Place({
                title: dp.title,
                imageUri: dp.imageUri,
                location: {
                  latitude: dp.lat,
                  longitude: dp.lng,
                  address: dp.address,
                },
                id: dp.id,
              })
            );
          }
          resolve(places);
        },
        (_, error): any => {
          reject(error);
        }
      );
    });
  });
}

export function fetchPlaceDetails(id: string) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places WHERE id = ?",
        [id],

        (_, result) => {
          const dbPlace = result.rows._array[0];
          const place = new Place({
            title: dbPlace.title,
            imageUri: dbPlace.imageUri,
            location: {
              latitude: dbPlace.lat,
              longitude: dbPlace.lng,
              address: dbPlace.address,
            },
            id: dbPlace.id,
          });
          resolve(place);
        },
        (_, error): any => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
