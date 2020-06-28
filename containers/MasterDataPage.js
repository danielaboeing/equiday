import React from 'react';
import { View, Text } from 'react-native';

function MasterDataPage(props) {
    return (
        <View>
            <Text>MasterData Area: {props.id}</Text>
        </View>
        
    );
}

export default MasterDataPage;
