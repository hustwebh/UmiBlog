import CryptoJS from "crypto-js"
import ENCRYPT_KEY  from '../config/secret'

const encrypt = (dataToStorage:any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(dataToStorage), ENCRYPT_KEY.toString())
}

const decrypt = (dataFromStorage:any) => {
  const bytes = CryptoJS.AES.decrypt(dataFromStorage, ENCRYPT_KEY.toString())
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}

const storageHelper = {
  get: (key:any) => {
    try {
      const formatted = decrypt(localStorage.getItem(key))
      return formatted
    } catch (e) {
      return undefined
    }
  },
  set: (key:any, value:any) => {
    localStorage.setItem(key, encrypt(value).toString())
  },
  clear: (key:any) => {
    localStorage.removeItem(key)
  },
}

export default storageHelper
