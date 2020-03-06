import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { ApplicationProvider, IconRegistry, Layout, Text, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';


import { actionCreators } from './Redux'
import List from './List'
import Input from './Input'
import store from './Store'

class HomeScreen extends Component {

    onAddTodo = (text) => {
        store.dispatch(actionCreators.add(text))
    }

    onRemoveTodo = (index) => {
        store.dispatch(actionCreators.remove(index))
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
            <Layout style={styles.container} >
                <TopNavigation
                    title='Center'
                    alignment='center'
                    leftControl={this.backAction()}
                />
                <Input placeholder={'Type a new task'} onSubmitEditing={this.onAddTodo} />
                <List list={todos} onPressItem={this.onRemoveTodo} />
            </Layout>
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
        padding: 16,
        flex: 1,
        backgroundColor: '#222b45'
    },
});