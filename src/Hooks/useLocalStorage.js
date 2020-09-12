import AsyncStorage from '@react-native-community/async-storage';

export function useLocalStorage() {
    const getData = async(key, SaveData) => {
        try {
            if (!SaveData) { alert('Error al obtener el dato') }
            else {
                await AsyncStorage.getItem(key).then((value) => {
                    SaveData(JSON.parse(value))
                })
            }
        } catch (error) {console.log(error)}
    }
    const setData = async(key, value) => {
        if (!value) { alert('Ingresa un valor') } else
           await AsyncStorage.setItem(key, JSON.stringify(value)).catch((error) => { });
    }
    const removeItem = async(key) => {await AsyncStorage.removeItem(key);}
    return { getData, setData, removeItem }
}