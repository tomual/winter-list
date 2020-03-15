import React, { Component } from 'react';
import { StyleSheet, View, ImageStyle } from 'react-native';
import { Avatar, Icon, IconElement, Divider, Drawer, DrawerElement, DrawerHeaderElement, DrawerHeaderFooter, DrawerHeaderFooterElement, Layout, Text, Button, } from '@ui-kitten/components';

import { actionCreators } from './Redux'
import store from './Store'
import { ModalAddList } from './Modal'

export const HomeDrawer = ({ navigation, state, lists }): DrawerElement => {

    const [visible, setVisible] = React.useState(false);
    
    const menuIcon = (style: ImageStyle): IconElement => (
        <Icon {...style} name='file-outline' />
    )
    const inboxIcon = (style: ImageStyle): IconElement => (
        <Icon {...style} name='inbox-outline' />
    )

    let menuData = [];
    for (var i = 0; i <= lists.length - 1; i++) {
        if (i == 0) {
            menuData.push({ title: lists[i].name, icon: inboxIcon, key: i })
        } else {
            menuData.push({ title: lists[i].name, icon: menuIcon, key: i })
        }
    }

    const onItemSelect = (index: number): void => {
        if (index == lists.length) {

        } else {
            navigation.navigate(state.routeNames[index]);
            store.dispatch(actionCreators.setPageIndex(index));
        }
    };

    const toggleModal = () => {
        setVisible(!visible);
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
            <ModalAddList />
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
            // footer={renderFooter}
            data={menuData}
            onSelect={onItemSelect}
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
    container: {
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 256,
        padding: 16,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
