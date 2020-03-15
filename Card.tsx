import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Button, Card, CardHeader, Text, Input } from '@ui-kitten/components';

import { actionCreators } from './Redux'
import store, { saveData } from './Store'

export const InputSimpleUsageShowcase = (updateInput) => {

    const [value, setValue] = React.useState('');

    const handleUpdate = (text) => {
        setValue()
        updateInput.updateInput(text)
    }

    return (
        <Input
            placeholder='Enter List Name'
            value={value}
            onChangeText={handleUpdate}
        />
    );
};

export const CardAddList = (closeModal) => {
    let nameValue = ""

    const Header = () => (
        <CardHeader
            title='Create New List'
        />
    );

    const Footer = () => (
        <View style={style.footerContainer}>
            <Button
                style={style.footerControl}
                size='small'
                onPress={closeModal.closeModal}
                status='basic'>
                CANCEL
        </Button>
            <Button
                style={style.footerControl}
                onPress={addPress}
                size='small'>
                ADD
        </Button>
        </View>
    );

    const addPress = () => {
        if (nameValue) {
            let item = {
                name: nameValue,
                list: []
            }
            store.dispatch(actionCreators.addList(item));
            saveData();
            closeModal.closeModal()
        }
    }

    const updateInput = (text) => {
        nameValue = text
    }

    return (
        <Card header={Header} footer={Footer} style={style.card}>
            <InputSimpleUsageShowcase updateInput={updateInput} />
        </Card>
    )
}

export const CardRemoveList = (closeModal, pageIndex) => {

    const Header = () => (
        <CardHeader
            title='Delete List'
        />
    );

    const Footer = () => (
        <View style={style.footerContainer}>
            <Button
                style={style.footerControl}
                size='small'
                onPress={closeModal.closeModal}
                status='basic'>
                CANCEL
        </Button>
            <Button
                style={style.footerControl}
                onPress={deletePress}
                size='small'>
                DELETE
        </Button>
        </View>
    );

    const deletePress = () => {
        store.dispatch(actionCreators.removeList());

        saveData();
        closeModal.closeModal()
    }

    return (
        <Card header={Header} footer={Footer} style={style.card}>
            <Text>Are you sure you want to delete this list? This action cannot be undone.</Text>
        </Card>
    )
}

const style = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 4,
    },
    card: {
        width: 300
    }
});