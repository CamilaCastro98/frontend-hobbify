import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
    },
    selectedCard: {
        backgroundColor: '#7E78D2',
    },
    type: {
        fontSize: 20,
        marginBottom: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
    },
});

export default styles;
