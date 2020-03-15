import { createStore } from 'redux'
import { reducer } from './Redux'
import { AsyncStorage } from 'react-native'

const store = createStore(reducer)

export default store

export const saveData = async () => {
    try {
        await AsyncStorage.setItem('TODOS', JSON.stringify(store.getState()))
    } catch (error) {
        console.error('Error saving')
    }
};