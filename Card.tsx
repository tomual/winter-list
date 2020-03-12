import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    Button,
    Card,
    CardHeader,
    Text,
    Input
} from '@ui-kitten/components';

import { actionCreators } from './Redux'
import store from './Store'

export const InputSimpleUsageShowcase = (updateInput) => {

    const [value, setValue] = React.useState('');

    const handleUpdate = (text) => {
        console.log("handleUpdate")
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

const Header = () => (
    <CardHeader
        title='Create New List'
    />
);

const Footer = () => (
    <View style={styles.footerContainer}>
        <Button
            style={styles.footerControl}
            size='small'
            status='basic'>
            CANCEL
    </Button>
        <Button
            style={styles.footerControl}
            onPress={addPress}
            size='small'>
            ADD
    </Button>
    </View>
);

const addPress = () => {
    console.log("Add")
    console.log(nameValue)
    let item = {
            name: nameValue,
            list: []
        }
        store.dispatch(actionCreators.addList(item));
}

let nameValue = ""

export const CardWithHeaderAndFooterShowcase = () => {

    const updateInput = (text) => {
        console.log("updateInput")
        console.log(text)
        nameValue = text
    }

    return (
        <Card header={Header} footer={Footer}>
            <InputSimpleUsageShowcase updateInput={updateInput} />
        </Card>
    )
}

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 4,
    },
});