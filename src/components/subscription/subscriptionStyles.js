import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#800080',
    },
    purchaseButton: {
        backgroundColor: '#7E78D2',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        marginTop: 20
    },
    purchaseButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
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
