import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Button,
    Layout,
    Modal,
    Text,
} from '@ui-kitten/components';
import { CardWithHeaderAndFooterShowcase } from './Card'

export const ModalWithBackdropShowcase = () => {

    const [visible, setVisible] = React.useState(false);

    const toggleModal = () => {
        setVisible(!visible);
    };

    const renderModalElement = () => (
        <CardWithHeaderAndFooterShowcase closeModal={toggleModal}/>
    );

    return (
        <Layout style={style.container}>
            <Button onPress={toggleModal}>
                ADD LIST
      </Button>
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