import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default  styles = {
    textName: {
        fontFamily: 'Kanit', 
        color:'#FBAA40',
        flex:1, 
        fontSize:responsiveFontSize(2),
        marginTop:responsiveHeight(2)
    },
    textPosition: {
        fontFamily: 'Kanit', 
        color:'white',
        flex:1, 
        fontSize:responsiveFontSize(2),
    },
    imageBg: {
        flex:1,
        width:responsiveWidth(100), 
        height:responsiveHeight(30),
        opacity:0.7
    },
    imageStyle: {
        width:responsiveWidth(30), 
        height:responsiveWidth(30), 
        borderRadius:responsiveWidth(15), 
        marginTop:responsiveHeight(2),
        borderWidth:responsiveWidth(1),
        borderColor:'#e9e8e6'
    },
    topic1: {
        fontFamily: 'Kanit', 
        color:'#734C2B',
        flex:1, 
        fontSize:responsiveFontSize(2),
        marginTop:responsiveHeight(1)
    },
    topic2: {
        fontFamily: 'Kanit', 
        color:'#715B52',
        flex:1, 
        fontSize:responsiveFontSize(2),
        marginTop:responsiveHeight(1)
    },
    content: {
        fontFamily: 'Kanit', 
        color:'#000',
        fontSize:responsiveFontSize(2),
        marginTop:responsiveHeight(1)
    },
    iconStyle: {
        color:'#F99B30',
        fontSize:responsiveFontSize(3),
        marginTop:0,
        marginRight: 0,
    },
    buttonView: {
        borderRadius:responsiveWidth(18/2),
        marginRight: 0,
        marginLeft: responsiveWidth(5),
        height: responsiveHeight(5),
        width: responsiveWidth(8.5),
        borderColor:"#F99B30",
        alignItems:'center',
        justifyContent:'center',
    }
};