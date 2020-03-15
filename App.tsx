import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { actionCreators } from './Redux'
import ListScreen from './ListScreen'
import store from './Store'
import { HomeDrawer } from './HomeDrawer'

const Drawer = createDrawerNavigator();

export default class App extends Component {

    UNSAFE_componentWillMount() {
        const { lists, pageIndex } = store.getState()
        this.setState({ lists: lists, pageIndex: pageIndex })

        this.unsubscribe = store.subscribe(() => {
            const { lists, pageIndex } = store.getState()
            this.setState({ lists: lists, pageIndex: pageIndex })
        })
        loadData(pageIndex)

    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    createScreens = (lists) => {
        let screens = []
        if (lists.length == 0) {
            screens.push(<Drawer.Screen key={0} name="Inbox" children={(props) => <ListScreen key={0} pageIndex={0} todos={{ list: [], name: "Inbox" }} {...props} />} />)
        }
        for (let i = 0; i <= lists.length - 1; i++) {
            screens.push(<Drawer.Screen key={i} name={lists[i].name + i} children={(props) => <ListScreen key={i} pageIndex={i} todos={lists[i].list} title={lists[i].name} {...props} />} />)
        }
        return screens
    }

    render() {
        const { lists, pageIndex } = this.state
        return (
            <React.Fragment>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider mapping={mapping} theme={darkTheme}>
                    <NavigationContainer>
                        <Drawer.Navigator initialRouteName="Inbox" drawerContent={(props) => <HomeDrawer lists={lists} {...props} />}>
                            {this.createScreens(lists)}
                        </Drawer.Navigator>
                    </NavigationContainer>
                </ApplicationProvider>
            </React.Fragment>
        )
    }
}

export const retrieveData = async () => {
    let value = {};
    try {
        const string = await AsyncStorage.getItem('TASKS')
        if (value !== null) {
            value = JSON.parse(string);
        }
    } catch (error) {
        console.error('Error loading')
    }
    return value;
};

export const loadData = async (pageIndex) => {
    let data = await retrieveData().then((data) => {
        if (data){
            store.dispatch(actionCreators.removeList())
            for (var i = 0; i <= data.lists.length - 1; i++) {
                store.dispatch(actionCreators.addList(data.lists[i]))
            }
        }
    });
}    