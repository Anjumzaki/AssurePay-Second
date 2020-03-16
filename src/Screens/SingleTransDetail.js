import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TransCard from './TransCard'

export default class SingleTransaction extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            eye: true,
            transction: null,
            date: '',
        };
    }
    componentWillMount() {
        this.setState({ transction: this.props.navigation.getParam('transction') })
    }
    
    render() {
        const months = ['Jan', 'Feb', 'Mar', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', "Nov", "Dec"]
     
        return (
            <KeyboardAwareScrollView>
                {/* <Card style={{ marginLeft: 10, marginRight: 10, padding: 0 }}>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Total Commissions: </Text>
                            <Text style={styles.head1}>$ {Math.round(commission)}</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Total Deductions: </Text>
                            <Text style={styles.head1}>$ {Math.round(deduction)}</Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardHead1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.head}>Total Sales: </Text>
                            <Text style={styles.head1}>{todays.length}</Text>
                        </View>
                    </CardItem>
                </Card>
                <View style={{ justifyContent: 'center' }}>

                    {this.state.transctions
                        !== null && this.state.date &&
                        todays.map((transc, index) => this.state.date == transc.soldDate || this.state.date == transc.payDate ?
                            // <TransCard transc={transc} key={index} /> 
                            <CardItem key={index} style={styles.cardHead1} >
                                <View style={styles.cardRow}>
                                    <Text style={styles.heada}>{transc.name} </Text>
                                    <Text style={styles.headb}>{months[new Date(this.state.date).getMonth() + 1]}  {new Date(this.state.date).getDate()}</Text>
                                    <Text style={styles.headc}>$ {transc.volume} </Text>
                                </View>
                            </CardItem>
                            : console.log(transc.payDate, transc.soldDate, 'Dates', this.state.date))
                    }
                </View> */}
                  {this.state.transction !== null ?
                  <TransCard navigation={this.props.navigation}  transc={this.state.transction}/>
                            : console.log(transc.payDate, transc.soldDate, 'Dates', this.state.date)
                    }
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        flexDirection: 'row',

        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#e8f1ff',
        width: '100%',
        justifyContent: 'space-between',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    heada: {
        fontSize: 20,
    },
    myDrops: {
        width: Dimensions.get('window').width / 2 - 20,
        alignItems: 'center',
        margin: 10,
        borderWidth: 1,
        borderColor: '#3f3fb9',
        fontSize: 20,
        borderRadius: 5,
        backgroundColor: '#F6F6F6',
    },
    myDrop: {
        height: 40,
        width: '100%',
        color: '#3f3fb9',
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: "#3f3fb9",
        borderWidth: 1,
        margin: 10
    },
    forms: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
        color: '#3f3fb9',
        width: Dimensions.get('window').width - 55,
        fontSize: 18,
    },
    head: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',
        width: Dimensions.get('window').width / 2 + 10
    },

    cardHead: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    cardHead1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
    },
    head1: {
        color: '#3f3fb9',
        alignSelf: 'flex-end',
        fontSize: 19,
    }
});

