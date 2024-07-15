import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        color: '#800080',
    },
    purchaseButton: {
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 40,
        borderWidth: 2,
        borderColor: 'white',
    },
    purchaseButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    buttonContainer: {
        paddingTop:40,
        paddingBottom:30,
        backgroundColor: '#7E78D2',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default styles;
