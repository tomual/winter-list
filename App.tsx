import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, AsyncStorage } from 'react-native'
import { ApplicationProvider, Divider, IconRegistry, Layout, Text, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

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

    backAction = () => (
        <TopNavigationAction icon={this.menuIcon} />
    );

    render() {
        const { todos } = this.props
        return (
            <SafeAreaView style={styles.container} >
                <TopNavigation
                    title='Center'
                    alignment='center'
                    leftControl={this.backAction()}
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
                    <HomeScreen todos={todos} />
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