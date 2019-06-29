import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';

import PeopleList from '../components/PeopleList';

export default class PeoplePage extends React.Component {  
    constructor(props){
        super(props);

        this.state = {
            peoples: [],
            loading: false,
            error: false
        }
    }

    componentDidMount() {
            this.setState({ loading: true });
        /* Promises 
        Resolved
        Pending
        Rejected
        */
    setTimeout(() => {
            axios
            .get('https://randomuser.me/api/?nat=BR&results=15')
            .then(response => {
                const { results } = response.data
                this.setState({
                    peoples: results,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({ 
                    error: true,
                    loading: false
                })
            });
        }, 3500)
    } 

    // renderLoading(){
    //     return this.state.loading ? <ActivityIndicator size="large" color="#6ca2f7"/> : null;        
    // }

    render() {
        //this.props.navigation.navigate('Chave da Pagina', 'State')
        return (
        <View style={styles.container}>
            {/* { this.renderLoading() } */}
            {
                this.state.loading 
                    ? <ActivityIndicator size="large" color="#6ca2f7"/>
                    : this.state.error
                        ? <Text style={styles.error}>Ops... Algo deu errado! =(</Text>
                        : <PeopleList 
                            peoples={this.state.peoples} 
                            onPressItem={(pageParams) =>  {
                            this.props.navigation.navigate('PeopleDetail', pageParams);
                        }}/>
            }
        </View>
        );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    erros: {
        color: 'red',
        alignSelf: 'center',
    }
})