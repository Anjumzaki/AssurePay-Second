import React from 'react';
import {Text} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

export default class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eye: true,
            userName: '',
            Password: '',
            msg: ""
        };
    }
    login(){
        this.props.navigation.navigate('MainTabs')
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        }))
    }

    render() {
        console.log("state",this.state)
        return (
            <Text>Main Screen</Text>
        );
    }
}