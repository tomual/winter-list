import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Alert } from 'react-native';
import {
    Avatar,
    Divider,
    Drawer,
    DrawerElement,
    DrawerHeaderElement,
    DrawerHeaderFooter,
    DrawerHeaderFooterElement,
    Layout,
    Modal,
    MenuItemType,
    Text,
    Button,
} from '@ui-kitten/components';
import { BookIcon, GithubIcon } from './Icons'
import { actionCreators } from './Redux'
import store from './Store'
import { ModalWithBackdropShowcase } from './Modal'
import { ModalRemoveList } from './ModalRemoveList'

export const HomeDrawer = ({ navigation, state, lists }): DrawerElement => {

    const [longPress, setlongPress] = React.useState(false)

    let menuData = [];
    for (var i = 0; i <= lists.length - 1; i++) {
        menuData.push({ title: lists[i].name, icon: GithubIcon })
    }

    var longPressStart = null
    var longPressEnd
    const touchStart = (index: number) => {
        longPressStart = new Date();
        checkLongPress()
    }

    const checkLongPress = () => {
            longPressEnd = new Date()
            var longPressTime = longPressEnd - longPressStart
            if (longPressTime > 1000) {
                console.log("Long Press!")
                setlongPress(true)
                longPressStart = null
            }
            setInterval(function () {
                if (longPressStart) {
                    checkLongPress()
                } else {
                    setlongPress(false)
                }
            }, 1000);
    }

    const onItemSelect = (index: number): void => {
        if (index == lists.length) {

        } else {
            navigation.navigate(state.routeNames[index]);
            store.dispatch(actionCreators.setPageIndex(index));
        }
    };

    const renderHeader = (): DrawerHeaderElement => (
        <Layout
            style={style.header}
            level='2'>
            <View style={style.profileContainer}>
                <Avatar
                    size='giant'
                    source={require('./assets/image-app-icon.png')}
                />
                <Text
                    style={style.profileName}
                    category='h6'>
                    WinterList
        </Text>
            </View>
            <ModalWithBackdropShowcase />
            <ModalRemoveList longPress={longPress}/>
        </Layout>
    );

    const renderFooter = (): DrawerHeaderFooterElement => (
        <React.Fragment>
            <Divider />
            <DrawerHeaderFooter
                disabled={true}
                description={`Version 2`}
            />
        </React.Fragment>
    );

    return (
        <Drawer
            header={renderHeader}
            footer={renderFooter}
            data={menuData}
            onSelect={onItemSelect}
            onTouchStart={touchStart}
        />
    );
};

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    header: {
        paddingTop: 48,
        paddingBottom: 16,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    profileName: {
        marginHorizontal: 16,
    },
});
