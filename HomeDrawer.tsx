import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Alert, ImageStyle } from 'react-native';
import {
    Avatar,
    Icon,
    IconElement,
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
import { CardWithHeaderAndFooterShowcase } from './Card'

export const HomeDrawer = ({ navigation, state, lists }): DrawerElement => {

    const menuIcon = (style: ImageStyle): IconElement => (
        <Icon {...style} name='file-outline'/>
    )
    const inboxIcon = (style: ImageStyle): IconElement => (
        <Icon {...style} name='inbox-outline'/>
    )
    const [visible, setVisible] = React.useState(false);
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

    // var longPressStart = null
    // var longPressEnd
    // const touchStart = (thing, event) => {
    //     console.log(thing)
    //     console.log(event)
    //     longPressStart = new Date();
    //     checkLongPress()
    // }

    // const checkLongPress = () => {
    //     longPressEnd = new Date()
    //     var longPressTime = longPressEnd - longPressStart
    //     if (longPressTime > 1000) {
    //         console.log("Long Press!")
    //         setVisible(true)
    //         longPressStart = null
    //     }
    //     setInterval(function() {
    //         if (longPressStart) {
    //             checkLongPress()
    //         } else {
    //         }
    //     }, 1000);
    // }

    const renderModalElement = () => (
        <CardWithHeaderAndFooterShowcase closeModal={toggleModal} />
    );
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
        </Layout>
    );

const LogoutButton = (style) => (
  <Button style={style} icon={BookIcon}/>
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
