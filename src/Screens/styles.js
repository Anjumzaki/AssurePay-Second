import { StyleSheet, Platform,Dimensions } from 'react-native';

export default StyleSheet.create({
  linearGradient: {
    minHeight: 555,
  },
  inputWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    paddingTop: 100,
    paddingBottom: 10,
    color: '#fff',
    fontSize: 25,
    fontWeight: '700',
  },
  inputSubLabel: {
    color: '#fff',
  },
  inputWrapStyle: {
    height: 50,
    marginTop: 30,
  },
  input: {
    height: 50,
    width: 40,
    borderRadius: 3,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  inputNotEmpty: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  nextButton: {
    marginTop: 100,
    width: 70,
    height: 70,
    borderRadius: 80,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonArrow: {
    transform: [{ translateX: -3 }, { rotate: '45deg' }],
    borderColor: '#ff595f',
    width: 20,
    height: 20,
    borderWidth: 4,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    margin: 10
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
    height: 10,
    width: 10,
    resizeMode: "stretch",
    alignItems: "center"
  },
  ImageStyle1: {
    padding: 10,
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
    height: 10,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  },
  forms: {
    fontSize: 19,
    padding: 8,
    width: Dimensions.get("window").width - 105,
    borderBottomWidth: 1,
    borderColor: "white",
    height: 50,
    fontFamily: "open-sans-bold",
    color: "white"
  },
  regButton1: {
    fontSize: 22,
    fontFamily: "open-sans-simple",
    color: "white"
  },
  regButton: {
    fontFamily: "open-sans-simple",
    width: Dimensions.get("window").width - 105,
    alignItems: "center",
    backgroundColor: "#ff1358",
    padding: 10,
    borderRadius: 100,
    marginTop: 60
  },
  reg: {
    textDecorationLine: "underline",
    color: "#ff1358",

    fontFamily: "open-sans-simple",
    fontSize: 20
  },
  reg1: {
    fontFamily: "open-sans-simple",
    color: "white",
    fontSize: 20
  }
});