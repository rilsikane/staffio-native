import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default  styles = {
    cardRead: {
        height: responsiveHeight(15),
        paddingLeft:responsiveWidth(1.5),
        paddingRight:responsiveWidth(1.5), 
        borderLeftWidth:responsiveWidth(2.5),
        flex:3,
    },
    cardNotRead: {
        height: responsiveHeight(15),
        paddingLeft:responsiveWidth(1.5),
        paddingRight:responsiveWidth(1.5), 
        borderLeftWidth:responsiveWidth(2.5),
        flex:3,
        backgroundColor: '#F7FBF7'
    },
    textName: {
        fontFamily: 'Kanit', 
        color:'#FBAB3E', 
        fontSize:responsiveFontSize(1.7)
    },
    textCause: {
        fontFamily:'Kanit', 
        color:'#939598',
        fontSize:responsiveFontSize(1.7)
    }
};