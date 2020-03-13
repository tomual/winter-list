import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Button,
    Layout,
    Modal,
    Text,
} from '@ui-kitten/components';
import { CardWithHeaderAndFooterShowcase } from './Card'

export const ModalRemoveList = (longPress) => {
    console.log("ModalRemoveList")
    console.log(longPress.longPress)


    const [visible, setVisible] = React.useState(true);

    const toggleModal = () => {
        setVisible(!visible);
    };

    const renderModalElement = () => (
        <CardWithHeaderAndFooterShowcase closeModal={toggleModal}/>
    );

    // if (longPress) {
    //     toggleModal()
    //     longPress = false
    // }

    return (
        <Layout style={style.container}>
            <Modal
                backdropStyle={style.backdrop}
                onBackdropPress={toggleModal}
                visible={visible}>
                {renderModalElement()}
            </Modal>
        </Layout>
    );
};

const style = StyleSheet.create({
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