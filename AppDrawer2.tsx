import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import DrawerScreen1 from './DrawerScreen1';
import DrawerScreen2 from './DrawerScreen2';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
});

class CustomDrawerContent extends Component {
    render() {
        const { customProp, navigation } = this.props
        console.log(customProp)
        return (
            <SafeAreaProvider>
                <ScrollView
                    style={styles.container}
                >
                    <DrawerItem
                        label="Screen1"
                        onPress={() => navigation.navigate('DrawerScreen1')}
                    />
                    <DrawerItem
                        label="Screen2"
                        onPress={() => navigation.navigate('DrawerScreen2')}
                    />
                    <DrawerItem
                        label="Close"
                        onPress={() => navigation.closeDrawer()}
                    />
                </ScrollView>

            </SafeAreaProvider>
        );
    }
}

class Navigator extends Component {
    render() {
        return (

            <NavigationContainer>
                <Drawer.Navigator
                    drawerContent={props => <CustomDrawerContent {...this.props} />}
                >
                    <Drawer.Screen
                        name="DrawerScreen1"
                        component={DrawerScreen1} />
                    <Drawer.Screen
                        name="DrawerScreen2"
                        component={DrawerScreen2} />
                </Drawer.Navigator>

            </NavigationContainer>
        );
    }
}


export default class App extends Component {

    render() {
        return (
            <Navigator customProp="right" />
        );
    }
}