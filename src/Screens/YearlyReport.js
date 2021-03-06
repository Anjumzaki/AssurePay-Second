import React from 'react';
import { View, Text, Image, TextInput, Dimensions, StyleSheet} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions, StackActions } from 'react-navigation';
import TransCard from './TransCard'
import { bindActionCreators } from "redux";
import { userAsync } from "../store/actions";
import { connect } from "react-redux";
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
class YearlyReport extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            eye: true,
            years: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            selectedYear: '',
            transctions: null
        };
    }
    login() {
        this.props.navigation.navigate('MainTabs')
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainTabs' })],
        }))
    }
    componentDidMount() {
        console.log(this.props)
        axios.get('https://intense-harbor-45607.herokuapp.com/get/all/transactions/' + this.props.user)
            .then(resp => {
                // console.log(resp.data)
                this.setState({ transctions: resp.data })
            })
            .catch(err => console.log(err))

    }

   
    changeDrop = (itemValue) => {
        this.setState({ selectedYear: itemValue })
    }
    render() {
        const placeholder = {
            label: 'Year',
            value: null,
            color: '#9EA0A4',
          };
        var myTransctions = []
        if (this.state.transctions !== null) {
            var trans = this.state.transctions
            for (var i = 0; i < this.state.transctions.length; i++) {
                if (new Date(trans[i].soldDate).getFullYear() == this.state.selectedYear) {
                    myTransctions.push(trans[i])
                    this.state.selectedYear
                }
             
            }
        }

        var key = this.state.seName;
        var serachedTractions =[]
        if (this.state.seName) {

            myTransctions = this.state.transctions.filter(function (transc) {
                return transc.name.toLowerCase().includes(key.toLowerCase())
                    
            });
        }

        return (
            <KeyboardAwareScrollView>
                <View >
                    {/* {console.log(this.state.selectedYear, 'i maslect4e')} */}

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.myDrops}>
                            <RNPickerSelect style={styles.myDrop}
                                onValueChange={(value) => this.changeDrop(value)}
                                placeholder={placeholder}
                                items={[
                                    { label: '2019', value: '2019' },
                                    { label: '2020', value: '2020' },
                                    { label: '2021', value: '2021' },
                                    { label: '2022', value: '2022' },
                                    { label: '2023', value: '2023' },
                                    { label: '2024', value: '2024' },
                                ]}
                            />
                            {/* <Picker
                                style={styles.myDrop}
                                selectedValue={this.state.selectedyear}
                                style={{ height: 50, width: 105 }}
                                onValueChange={(itemValue, itemIndex) =>
                                   this.setState({selectedYear:itemValue})
                                }> 
                                    <Picker.Item  label='2020' value='2020' />
                                    <Picker.Item  label='2021' value='2021' />
                                    <Picker.Item  label='2022' value='2022' />
                                    <Picker.Item  label='2023'  value='2023' />
                                    <Picker.Item  label='2019' value='2019' />
                                                                    {/* {this.state.years.map((item, i) => (
                                    <Picker.Item key={i} label={item} value={item} />
                                ))} 
                            </Picker> */}
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.forms}
                                placeholderTextColor={'gray'}
                                onChangeText={seName => this.setState({ seName })}
                                value={this.state.seName}
                                placeholder="Search"
                                keyboardType="default"
                                returnKeyType="next"
                            />
                            <Image style={{ padding: 10, marginRight: 10, width: 20, height: 20 }} source={require('../../assets/newICons/042-magnifying-glass.png')} />
                        </View>
                    </View>
                    {(this.state.transctions !== null ? myTransctions !== null ?
                        myTransctions.map(
                            (transc, index) => <TransCard  transc={transc} key={index} />
                        )
                        : <Text> NO Data in Year {this.state.selectedYear} </Text> : <Text> NO I coming in Year {this.state.selectedYear} </Text>)}
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    myDrops: {
        width: Dimensions.get('window').width / 3,
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
        padding: 10,
        backgroundColor: '#fff',
        color: '#3f3fb9',
        width: (Dimensions.get('window').width - (Dimensions.get('window').width / 3)) - 75,
        fontSize: 18,
    },
    head: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',
    },

    cardHead: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    cardHead1: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    head1: {
        color: '#3f3fb9',
        alignSelf: 'center',
        fontSize: 19

    }
});


const mapStateToProps = state => ({
    user: state.user.userId,
});
const mapDispatchToProps = (dispatch, ownProps) =>
    bindActionCreators(
        {
            userAsync
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(YearlyReport);