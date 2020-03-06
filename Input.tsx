import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { Input as KittyInput } from '@ui-kitten/components';

export default class Input extends Component {
    state = {
        text: ''
    }

    onChangeText = text => this.setState({ text })

    onSubmitEditing = () => {
        const { onSubmitEditing } = this.props
        const { text } = this.state

        if (!text) {
            return
        }

        onSubmitEditing({ title: text })
        this.setState({ text: '' })
    }

    render() {
        const { placeholder } = this.props
        const { text } = this.state

        return (
            <KittyInput
                value={text}
                placeholder={placeholder}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEditing}
            />
        )
    }
}
