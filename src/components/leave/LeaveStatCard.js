import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import LeaveStatContent from "./LeaveStatContent";
export default class LeaveStatCard extends React.Component {
    renderHistory() {
        return this.props.data.map(infoHis => <LeaveStatContent key={infoHis.id} infoHis={infoHis} />);
    }
    render() {
        console.log(this.props.data);
        return (
            <Card style={{ marginBottom: 0 }}>
                <CardItem>
                    <Body style={{ flex: 4 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.titleText} > {this.props.title}</Text>
                            <Text style={styles.dateTxt}>  {this.props.date}</Text>
                        </View>
                        <View style={styles.viewHistory}>
                            {this.renderHistory()}
                        </View>
                    </Body>
                </CardItem>
            </Card>

        );
    }
}



const styles = StyleSheet.create({
    viewHistory: { flexDirection: 'row', flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 10, paddingBottom: 5 },
    dateTxt: { fontFamily: 'Kanit', color: '#a9a9a9', fontSize: responsiveFontSize(1.5), paddingTop: 3 },
    titleText: { fontFamily: 'Kanit-Medium', color: '#7e6560', fontSize: responsiveFontSize(2),},
})