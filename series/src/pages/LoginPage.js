import React from 'react';
import { View, StyleSheet, TextInput, Button, ActivityIndicator, Text } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import {tryLogin} from '../actions';

import FormRow from '../components/FormRow';

class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mail: '',
            password: '',
            isLoading: false,
            message: ''
        }
    }

    componentDidMount(){
        const firebaseConfig = {
            apiKey: "AIzaSyDAReIurnOoKEX0fBy0UOgo1vF9kRpqjJM",
            authDomain: "series-8dead.firebaseapp.com",
            databaseURL: "https://series-8dead.firebaseio.com",
            projectId: "series-8dead",
            storageBucket: "",
            messagingSenderId: "131493744162",
            appId: "1:131493744162:web:b0f40db2c67466d9"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

    }

    onChangeHandler(field, value) {
        this.setState({ [field]: value })
    }

    tryLogin() {
        this.setState({ isLoading: true, message: '' });
        const { mail: email, password } = this.state;

        this.props.tryLogin({ email, password })
            .then((user) => {
                if(user) {
                    return this.props.navigation.replace('Main');
                } 
                this.setState({ 
                    isLoading: false,
                    message: ''
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, message: this.getMessageByErrorCode(error.code) })
            })

    }

    getMessageByErrorCode(errorCode) {
        switch(errorCode) {
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            default:
                return 'Erro desconhecido';
        }
    }

    renderMessage() {
        const { message } = this.state;
        if(!message) return null;

        return (
            <View>
                <Text>{message}</Text>
            </View>
        );
    }

    renderButton() {
        if(this.state.isLoading)
            return <ActivityIndicator />;
        return (
            <Button 
                title="Entrar" 
                onPress={() => this.tryLogin()}
                />
        )
    }
    
    render(){
        return(
            <View>
                <FormRow first>
                    <TextInput 
                        style={styles.input}
                        placeholder="user@email.com"
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler('mail', value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCompleteType="off"
                        />
                </FormRow>
                <FormRow last>
                    <TextInput 
                        placeholder="******"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                        />
                </FormRow>
                { this.renderButton() }
                { this.renderMessage() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    }
});

export default connect(null, { tryLogin })(LoginPage)

