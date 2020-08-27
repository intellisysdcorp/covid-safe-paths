import CryptoJS from 'react-native-crypto-js';

import { STORAGE_KEY } from '../constants/DR/baseUrls';

// Encrypt
export function Encrypt(text) {
  return CryptoJS.AES.encrypt(text, STORAGE_KEY).toString();
}

// Decrypt
export function Decrypt(ciphertext) {
  return CryptoJS.AES.decrypt(ciphertext, STORAGE_KEY).toString(
    CryptoJS.enc.Utf8,
  );
}
