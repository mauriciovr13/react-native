import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const SerieCard = ({ serie, isFirstColumn }) => (
    <View style={[
            styles.container, 
            isFirstColumn ? styles.firstColumn : styles.lastColumn
        ]}>
        <View style={styles.card}>
            <Image 
                source={{
                    uri: serie.img
                }}
                aspectRatio={1}
                resizeMode="cover"
            />
            <View style={styles.cardTitleWraper}>
                <Text style={styles.cardTitle}>{serie.title}</Text>
            </View>
        </View>        
    </View>
);

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '50%',
        padding: 5,
        height: Dimensions.get('window').width/2,
    },
    card: {
        flex: 1,
        borderWidth: 1
    },
    cardTitleWraper: {
        backgroundColor: 'black',
        height: 50,
        
        position: 'absolute',
        bottom: 0,
        opacity: .8,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 3,
        paddingRight: 3,
        alignItems: 'center'
    },
    cardTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',

    },
    firstColumn: {
        paddingLeft: 10
    },
    lastColumn: {
        paddingRight: 10
    }
});

export default SerieCard;