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
        <CardWithHeaderAndFooterShowcase />
    );

    return (
        <Layout style={stylez.container}>
            <Button onPress={toggleModal}>
                TOGGLE MODAL
      </Button>
            <Modal
                backdropStyle={stylez.backdrop}
                onBackdropPress={toggleModal}
                visible={visible}>
                {renderModalElement()}
            </Modal>
        </Layout>
    );
};

const stylez = StyleSheet.create({
    container: {
        padding: 16,
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