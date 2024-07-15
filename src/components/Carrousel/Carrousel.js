import * as React from 'react';
import { Dimensions, Text, View, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import img1 from '../../../assets/landingImg/img1.jpg';
import img2 from '../../../assets/landingImg/img2.jpg';
import img3 from '../../../assets/landingImg/img3.jpg';

const imageData = [
    { uri: img1 },
    { uri: img2 },
    { uri: img3 },
];


function Carrousel() {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={'100%'}
                autoPlay={true}
                data={imageData}
                scrollAnimationDuration={1500}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image source={item.uri} style={styles.image} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default Carrousel;
