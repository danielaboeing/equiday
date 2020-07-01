import { StyleSheet } from 'react-native';


const textColor = '#438034';
const specialFont = "RockSalt_400Regular";
const normalFont = "Roboto";
const bgColor = '#6AA95B';
const bgColorAlt = '#C6EBBD';
const highlightColor = '#FFFFFF';

export default StyleSheet.create({

    navigationBar: {
        height: 70,
        left: 0,
        top: 0,
    },
    navbarText: {
        width: '100%',
        height: 35,
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
        position: "absolute",
        marginLeft: 17,
        marginTop: 40,
    },
    hamburgerPic: {
        width: 30,
        height: 15,
    },
    sidebarTop: {
        height: 90,
        paddingTop: 30,
        flexDirection: 'row'
    },
    sidebarBottom: {
        height: '100%',
        backgroundColor: bgColorAlt,
    },
    sidebarMenuItem: {
        color: textColor,
        fontSize: 18,
        margin: 10
    },
    sidebarSubItem: {
        color: textColor,
        fontSize: 14,
        marginLeft: 20,
        margin: 5
    },
    sidebarLogo: {
        height: '80%',
        resizeMode: 'contain',
        flex: 1
    },
    sidebarLogoText: {
        flex: 2,
        fontFamily: specialFont,
        color: textColor,
        fontSize: 18
    },
    tableRow: {
        alignSelf: 'stretch',
        flexDirection: 'row',
    },
    tableCell: {
        flex: 1,
        padding: 5,
    },
    tableEntry: {
        flex: 1
    },
    table: {
        borderWidth: 1,
        borderColor: bgColor,
        margin: 10,
    },
    tableHeadText: {
        fontFamily: specialFont,
        fontSize: 10
    },
    tableEntryText: {
        fontFamily: normalFont
    },
    tableDelimiter: {
        borderBottomColor: bgColor,
        borderBottomWidth: 1,
    },
    detailSectionWrapper: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        backgroundColor: bgColorAlt,
    },
    detailSection: {
        flexDirection: 'row',
    },
    detailText: {
        flex: 1,
        fontFamily: specialFont,
        fontSize: 12,
    },
    detailTextEntry: {
        flex: 1,
        fontFamily: normalFont,
        fontSize: 15,
        height: 20,
    },
    detailImgEntry: {
        flex: 1,
        resizeMode: 'contain',
        width: 20,
    },
    trafficLightTouchable: {
        height: 15,
        width: 20,
        marginLeft: 20,
        marginRight: 20

    },
    bottomActionBtnWrapper: {
        backgroundColor: bgColor,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    bottomActionBtn: {
        flex: 1,
        padding: 10
    },
    bottomDelimiter: {
        borderLeftWidth: 1,
        borderLeftColor: 'white',
    },
    bottomActionText: {
        fontFamily: specialFont,
        fontSize: 14,
        textAlign: 'center',
        color: highlightColor
    },

});
