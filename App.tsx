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

class HomeScreen extends Component {

    onAddTodo = (text) => {
        store.dispatch(actionCreators.add(text));
        storeData();
    }

    onRemoveTodo = (index) => {
        setTimeout(function() {
            store.dispatch(actionCreators.remove(index));
        }, 300);
        storeData();
    }

    menuIcon = (style) => (
        <Icon {...style} name='menu-outline' />
    );

    backAction = (navigation) => (
        <TopNavigationAction icon={this.menuIcon} onPress={() => navigation.openDrawer()} />
    );

    render() {
        const { todos, navigation } = this.props

        console.log(navigation);
        return (
            <SafeAreaView style={styles.container} >
                <TopNavigation
                    title='Center'
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

const DrawerContent = ({ navigation, state }) => {
    const onSelect = (index) => {
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <UIKittenDrawer
            data={[{ title: 'Home' }, { title: 'Settings' }]}
            selectedIndex={state.index}
            onSelect={onSelect}
        />
    );
};

const Drawer = createDrawerNavigator();
export default class App extends Component {

    state = {}

    UNSAFE_componentWillMount() {
        const { todos } = store.getState()
        this.setState({ todos })

        this.unsubscribe = store.subscribe(() => {
            const { todos } = store.getState()
            this.setState({ todos })
        })
        loadData();
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const { todos } = this.state
        return (
            <React.Fragment>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider mapping={mapping} theme={darkTheme}>
                    <NavigationContainer>
                        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
                            <Drawer.Screen name="Home" component={(props) => <HomeScreen todos={todos} {...props} />} />
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
    let value = { todos: [] };
    try {
        const string = await AsyncStorage.getItem('TASKS')
        if (value !== null) {
            value = JSON.parse(string);
        }
    } catch (error) {
        console.log('Error loading')
    }
    return value;
};

export const loadData = async () => {
    let data = await retrieveData().then((data) => {
        for (var i = data.todos.length - 1; i >= 0; i--) {
            store.dispatch(actionCreators.add(data.todos[i]))
        }
    });

}    