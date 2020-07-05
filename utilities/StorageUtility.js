 
import AsyncStorage from '@react-native-community/async-storage';

export default class StorageUtility {
    constructor(){
        this.storeData("testWert");
        this.getData()
    }


storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@test', value)
    } catch (e) {
      // saving error
    }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@test')
      if(value !== null) {
        console.log(value)
      }
    } catch(e) {
      // error reading value
    }
  }
}

