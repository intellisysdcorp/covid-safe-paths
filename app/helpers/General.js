import AsyncStorage from '@react-native-community/async-storage';
import CryptoJS from 'react-native-crypto-js';
import DocumentPicker from 'react-native-document-picker';

import { PHONE_STORAGE_SECRET_KEY } from '../constants/DR/baseUrls';

/**
 * Get data from store
 *
 * @param {string} key
 * @param {boolean} isString
 */
export async function GetStoreData(key, isString = true) {
  try {
    let getData = await AsyncStorage.getItem(key);

    if (getData !== null) {
      const decryptData = CryptoJS.AES.decrypt(
        getData,
        PHONE_STORAGE_SECRET_KEY,
      ).toString(CryptoJS.enc.Utf8);

      if (decryptData === '') {
        SetStoreData(key, getData);
      } else if (decryptData) {
        getData = decryptData;
      }
    }

    return isString ? getData : JSON.parse(getData);
  } catch (error) {
    console.log(error.message);
  }
  return false;
}

/**
 * Set data from store
 *
 * @param {string} key
 * @param {object} item
 */
export async function SetStoreData(key, item) {
  try {
    //we want to wait for the Promise returned by AsyncStorage.setItem()
    //to be resolved to the actual value before returning the value
    if (typeof item !== 'string') {
      item = JSON.stringify(item);
    }

    const encryptItem = CryptoJS.AES.encrypt(
      item,
      PHONE_STORAGE_SECRET_KEY,
    ).toString();

    return await AsyncStorage.setItem(key, encryptItem);
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Remove data with associated key from store
 *
 * @param {string} key
 * @param {object} item
 */
export async function RemoveStoreData(key) {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error.message);
  }
}

export async function pickFile() {
  // Pick a single file - returns actual path on Android, file:// uri on iOS
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.zip, DocumentPicker.types.allFiles],
      usePath: true,
    });
    return res.uri;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}

export function getMyself(data) {
  return data.some(user => user.use === 'mySelf' && user.positive === true);
}
