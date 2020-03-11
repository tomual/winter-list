import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, AsyncStorage } from 'react-native'
import { ApplicationProvider, Divider, IconRegistry, Layout, Text, TopNavigation, TopNavigationAction, Icon, Drawer as UIKittenDrawer } from '@ui-kitten/components';
import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { actionCreators } from './Redux'
import List from './List'
import Input from './Input'
import store from './Store'
import { BookIcon } from './Icons'
import { HomeDrawer } from './HomeDrawer'

class ListScreen extends Component {

    onAddTodo = (text) => {
        store.dispatch(actionCreators.add(text));
        storeData();
    }

    onRemoveTodo = (index) => {
        setTimeout(function() {
            store.dispatch(actionCreators.remove(index));
            storeData();
        }, 300);
    }

    menuIcon = (style) => (
        <Icon {...style} name='menu-outline' />
    );

    backAction = (navigation) => (
        <TopNavigationAction icon={this.menuIcon} onPress={() => navigation.openDrawer()} />
    );

    render() {
        const { todos, navigation, page } = this.props
        return (
            <SafeAreaView style={styles.container} >
                <TopNavigation
                    title={page}
                    alignment='center'
                    leftControl={this.backAction(navigation)}
                    style={styles.topnav}
                />
                <Divider />
                <Layout style={styles.layout}>
                    <Input placeholder={'Type a new task'} onSubmitEditing={this.onAddTodo} />
                </Layout>
                <List list={todos} onPressItem={this.onRemoveTodo} />
            </SafeAreaView>
        )
    }
};

const DrawerContent = ({ navigation, state, todos }) => {
    console.log(todos)

    const onSelect = (index) => {
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <UIKittenDrawer
            data={[
                { title: 'Home', icon: BookIcon },
                { title: 'Settings' },
            ]}
            selectedIndex={state.index}
            onSelect={onSelect}
        />
    );
};

const Drawer = createDrawerNavigator();
export default class App extends Component {

    UNSAFE_componentWillMount() {
        const { lists, page } = store.getState()
        this.setState({ lists: lists, page: page })

        this.unsubscribe = store.subscribe(() => {
            const { lists, page } = store.getState()
            this.setState({ lists: lists, page: page })
        })
        loadData(page);
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const { lists, page } = this.state
        return (
            <React.Fragment>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider mapping={mapping} theme={darkTheme}>
                    <NavigationContainer>
                        <Drawer.Navigator initialRouteName="Inbox" drawerContent={(props) => <HomeDrawer todos={lists} {...props} />}>
                            <Drawer.Screen name="Inbox" children={(props) => <ListScreen page={page} todos={lists[page]} {...props} />} />
                        </Drawer.Navigator>
                    </NavigationContainer>
                </ApplicationProvider>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222b45',
        paddingTop: 20
    },
    layout: {
        padding: 16,
    },
});

export const storeData = async () => {
    try {
        await AsyncStorage.setItem('TASKS', JSON.stringify(store.getState()))
    } catch (error) {
        console.error('Error saving')
    }
};

export const retrieveData = async () => {
    let value = {
        page: 'Inbox',
        lists: {
            "Inbox": [
            ]
        }
    };
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

export const loadData = async (page) => {
    let data = await retrieveData().then((data) => {
        for (var i = data.lists[page].length - 1; i >= 0; i--) {
            store.dispatch(actionCreators.add(data.lists[page][i]))
        }
    });

}    