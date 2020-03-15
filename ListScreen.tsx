import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, AsyncStorage } from 'react-native'
import { Divider, Layout, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';

import { actionCreators } from './Redux'
import List from './List'
import Input from './Input'
import store from './Store'
import { OverflowMenuList } from './OverflowMenuList'

export default class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { isOptionsOpen: false };
    }
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

    moreIcon = (style) => (
        <Icon {...style} name='more-vertical' />
    );

    backAction = (navigation) => (
        <TopNavigationAction icon={this.menuIcon} onPress={() => navigation.openDrawer()} />
    );

    openOptions = () => {
        this.setState({
            isOptionsOpen: true
        });
    };

    toggleOptions = (menuVisible) => {
        this.setState({
            isOptionsOpen: menuVisible
        });
    };

    optionAction = (isOptionsOpen, pageIndex) => {
        if (pageIndex != 0) {
            return (
                <Layout>
                    <TopNavigationAction icon={this.moreIcon} onPress={this.openOptions} />
                    <OverflowMenuList isVisible={isOptionsOpen} callback={this.toggleOptions} />
                </Layout>
            )
        }
    };

    render() {
        const { isOptionsOpen } = this.state
        const { todos, navigation, pageIndex, title } = this.props
        return (
            <SafeAreaView style={styles.container} >
                <TopNavigation
                    title={title}
                    alignment='center'
                    leftControl={this.backAction(navigation)}
                    rightControls={this.optionAction(isOptionsOpen, pageIndex)}
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
        await AsyncStorage.setItem('TODOS', JSON.stringify(store.getState()))
    } catch (error) {
        console.error('Error saving')
    }
};