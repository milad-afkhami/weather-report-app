import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableHighlight,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    var navigation = this.props.navigation;
    this.state = {
      searchInput: '',
      searchResult: 0,
      error: 'Search for a city...',
      item: {},
    };
  }

  searchCity = () => {
    this.fetchCityTemp(this.state.searchInput);
  };

  fetchCityTemp = city => {
    this.setState({
      item: {},
      searchResult: 0,
      error: 'Search for a city...',
    });

    fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=ea25cd16e1d019547267f59cb4dc83e2&units=metric'
    )
      .then(response => response.json())
      .then(responseJson => {
        var r = responseJson.main;
        var obj = responseJson;
        if (responseJson.cod !== 200) {
          this.setState({
            searchResult: 0,
            error: 'City not found!',
          });
        } else {
          var city = {
            name: obj.name,
            temp: Math.ceil(r.temp),
            type: obj.weather[0].main,
            desc: 'Humidity: ' + r.humidity + '% - ' + obj.weather[0].main,
          };
          this.setState({
            item: city,
            searchResult: 1,
          });
        }
      });
  };

  getTempRange = temp => {
    if (temp < 10) {
      return 1;
    } else if (temp >= 10 && temp < 20) {
      return 2;
    } else if (temp >= 20 && temp < 30) {
      return 3;
    } else if (temp >= 30) {
      return 4;
    }
  };

  getEmoji = type => {
    if (type == 'Clouds') {
      return '☁';
    } else if (type == 'Clear') {
      return '☀';
    } else if (type == 'Haze') {
      return '⛅';
    } else if (type == 'Thunderstorm') {
      return '🌩';
    } else if (type == 'Rain') {
      return '🌧';
    } else if (type == 'Snow') {
      return '🌨';
    } else if (type == 'Mist') {
      return '☁';
    }
  };

  render() {
    return (
      <View style={styles.view}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.topbar}>☀ CityWeather</Text>

        <View style={styles.container}>
          <Text
            style={styles.inputLabel}>
            Search for city
          </Text>
          <TextInput
            onChangeText={text => this.setState({ searchInput: text })}
            value={this.state.searchInput}
            style={{
              width: '80%',
              padding: 15,
              margin: 5,
              backgroundColor: '#333',
              color: '#fff',
            }}
          />
          <TouchableHighlight
            style={styles.searchBtn}
            onPress={() => this.searchCity()}>
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableHighlight>
        </View>

        {this.state.searchResult == 1 ? (
          <View style={styles.row}>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => alert(this.state.item.desc)}
              style={styles.fullWidth}>
              <LinearGradient
                colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}
                start={[0, 0.05]}
                style={styles.row}>
                <Text
                  style={[
                    this.getTempRange(this.state.item.temp) == 1
                      ? styles.cold
                      : null,
                    this.getTempRange(this.state.item.temp) == 2
                      ? styles.medium
                      : null,
                    this.getTempRange(this.state.item.temp) == 3
                      ? styles.hot
                      : null,
                    this.getTempRange(this.state.item.temp) == 4
                      ? styles.vhot
                      : null,
                    styles.temp,
                  ]}>
                  {this.getEmoji(this.state.item.type)} {this.state.item.temp}
                  °C
                </Text>
                <Text style={styles.cityN}>{this.state.item.name}</Text>
              </LinearGradient>
            </TouchableHighlight>
          </View>
        ) : (
          <View style={styles.center}>
            <Text
              style={styles.errorMessage}>
              {this.state.error}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    // width: '100%',
    // backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  container: { 
    alignItems: 'center', 
    width: '90%' 
  },
  topbar: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputLabel: {
    textAlign: 'center',
    lineHeight: 20,
    padding: 5,
    fontSize: 16,
  },
  searchBtn: { 
    backgroundColor: 'grey', 
    padding: 20, 
    borderRadius: 8, 
    marginBottom: 40 
  },
  searchBtnText: { 
    fontSize: 14, 
    color: 'white' 
  },
  row: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  cityN: {
    fontSize: 20,
    lineHeight: 40,
    fontFamily: 'Avenir',
    color: 'black',
  },
  temp: {
    fontSize: 30,
    lineHeight: 40,
    width: 130,
    marginRight: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  center: { 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  errorMessage: {
    textAlign: 'center',
    lineHeight: 20,
    padding: 5,
    fontSize: 16,
  },
  fullWidth: { width: '100%' },
  cold: { color: 'blue' },
  medium: { color: 'green' },
  hot: { color: 'orange' },
  vhot: { color: 'red' },
});
