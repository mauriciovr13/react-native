import React from 'react';
import { View, StyleSheet, TextInput, Button, ActivityIndicator, Text } from 'react-native';
import firebase from 'firebase';

import FormRow from '../components/FormRow';

export default class LoginScreen extends React.Component{
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
        this.setState({ isLoading: true, message: '' })
        const { mail, password } = this.state

        const loginUserSuccess = user => {
            this.setState({ message: 'Sucesso!' });
            this.props.navigation.navigate('Main');
        }

        const loginUserFailed = error => {
            this.setState({ message: this.getMessageByErrorCode(error.code) })
        }

        firebase
            .auth()
            .signInWithEmailAndPassword(mail, password)
            .then(loginUserSuccess)
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    alert.alert(
                        'Usuário não encontrado', /* title */
                        'Deseja criar um cadastro com as informações inseridas?', /* message */ 
                        [
                            {
                                text: 'Não', 
                                onPress: () => {}, 
                                style: 'cancel' // IOS
                            }, {
                                text: 'Sim', 
                                onPress: () => {
                                    firebase
                                        .auth()
                                        .createUserWithEmailAndPassword(mail, password)
                                        .then(loginUserSuccess)
                                        .catch(loginUserFailed)
                                },                                
                            }
                        ],
                        { cancelable: false }
                    )
                }
                return ;                
            })
            .then(() => this.setState({ isLoading: false }));
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
})