import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { CheckBox } from '@ui-kitten/components';
import { List as KittyList, ListItem as KittyListItem, Button as KittenButton, Icon as KittenIcon } from '@ui-kitten/components';

export default class List extends Component {

    state = { checked: false }

    handleClicked = () => {
        this.setState(() => {
            return { checked: true }
        })
    }

    renderItemIcon = (style) => (
        <KittenIcon {...style} name='square-outline' />
    );

    renderItem = ({ item, index }) => {
        const { onPressItem } = this.props
        const { checked } = this.state

        return (
            <KittyListItem
                style={styles.listItem}
                title={item.title}
                icon={this.renderItemIcon}
                onPress={() => onPressItem(index)}
            />
        )
    }

    render() {
        const { list } = this.props

        return <KittyList style={styles.list} data={list} renderItem={this.renderItem} />
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: '#222b45',
        paddingLeft: 16,
        paddingRight: 16
    },
    listItem: {
        height: 55
    },
});