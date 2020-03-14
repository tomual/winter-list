import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Button,
    Icon,
    Layout,
    OverflowMenu,
    Modal,
} from '@ui-kitten/components';
import { CardWithHeaderAndFooterShowcaseRemove } from './Card'

const StarIcon = (style) => (
    <Icon {...style} name='trash-outline' />
);

const data = [
    {
        title: 'Delete List',
        icon: StarIcon,
    },
];

export const OverflowMenuList = (props) => {

    const [menuVisible, setMenuVisible] = React.useState(props.isVisible);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [visible, setVisible] = React.useState(false);


    React.useEffect(() => { 
        setMenuVisible(props.isVisible) 
    }, [props.isVisible])

    const onItemSelect = (index) => {
        setSelectedIndex(index);
        setMenuVisible(false);
        props.callback(false);
        toggleModal()
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        props.callback(!menuVisible);
    };

    const menuIcon = (style) => {
        <Icon {...style} name='menu-outline' />
    }


    const toggleModal = () => {
        setVisible(!visible);
    };

    const renderModalElement = () => (
        <CardWithHeaderAndFooterShowcaseRemove closeModal={toggleModal}/>
    );

    return (
        <Layout>
            <OverflowMenu
                data={data}
                visible={menuVisible}
                // selectedIndex={selectedIndex}
                onSelect={onItemSelect}
                onBackdropPress={toggleMenu}>
                <Icon name='menu-outline' />
            </OverflowMenu>
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
        minHeight: 256,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});