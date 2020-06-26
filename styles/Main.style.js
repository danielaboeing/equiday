import { StyleSheet } from 'react-native';


const textColor = '#438034';
const specialFont = "RockSalt_400Regular";
const normalFont = "Roboto";
const bgColor = '#6AA95B';

export default StyleSheet.create({

    navigationBar: {
        height: 90,
        left: 0,
        top: 0,
    },
    navbarText: {
        width: '100%',
        height: 35,
        position: "absolute",
        right: 20,
        top: 30,
        fontFamily: specialFont,
        fontWeight: "normal",
        fontSize: 14,
        lineHeight: 29,
        textAlign: "right",
        color: textColor
    },
    hamburger: {
        width: 50,
        height: 30,
        position: "absolute",
       left: 17,
        top: 40,
    },
    hamburgerPic: {
        width: 30,
        height: 15,
    },
    sidebarBottom: {
        height: '100%',
        left: 0,
        top: 62,
        backgroundColor: bgColor, 
    }

});
