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
        const { todos, navigation, pageIndex } = this.props
        return (
            <SafeAreaView style={styles.container} >
                <TopNavigation
                    title={pageIndex}
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
        const { lists, pageIndex } = store.getState()
        this.setState({ lists: lists, pageIndex: pageIndex })

        this.unsubscribe = store.subscribe(() => {
            const { lists, pageIndex } = store.getState()
            this.setState({ lists: lists, pageIndex: pageIndex })
        })
        loadData(pageIndex);
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    createScreens = (lists) => {
        let screens = []
        if (lists.length == 0) {
            screens.push(<Drawer.Screen key={0} name="Inbox" children={(props) => <ListScreen key={0} pageIndex={0} todos={{list: [], name:"Inbox"}} {...props} />} />)
        }
        for (let i = 0; i <= lists.length - 1; i++) {
            screens.push(<Drawer.Screen key={i} name={lists[i].name + i} children={(props) => <ListScreen key={i} pageIndex={i} todos={lists[i].list} {...props} />} />)
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
        for (var i = 0; i <= data.lists.length - 1; i++) {
            store.dispatch(actionCreators.addList(data.lists[i]))
        }
    });
}    