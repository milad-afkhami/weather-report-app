import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    var navigation = this.props.navigation;
    this.state = {
      cities: [
        { name: 'London', country: 'UK' },
        { name: 'Ebinnurgh', country: 'UK' },
        { name: 'New York', country: 'US' },
        { name: 'Texas', country: 'UK' },
        { name: 'Washington', country: 'US' },
        { name: 'Paris', country: 'France' },
        { name: 'Doha', country: 'Qatar' },
        { name: 'Sydney', country: 'Australia' },
        { name: 'Cancun', country: 'Mexico' },
        { name: 'Madrid', country: 'Spain' },
        { name: 'Berlin', country: 'Germany' },
        { name: 'Brussels', country: 'Belgium' },
        { name: 'Copenhagen', country: 'Denmark' },
        { name: 'Athens', country: 'Greece' },
        { name: 'New Dehli', country: 'India' },
        { name: 'Dublin', country: 'Ireland' },
        { name: 'Rome', country: 'Italy' },
        { name: 'Tokyo', country: 'Japan' },
        { name: 'Wellington', country: 'New Zealand' },
        { name: 'Amsterdam', country: 'Netherlands' },
        { name: 'Oslo', country: 'Norway' },
        { name: 'Panama City', country: 'Panama' },
        { name: 'lisbon', country: 'Portugal' },
        { name: 'Warsaw', country: 'poland' },
        { name: 'Moscow', country: 'Russia' },
      ],
      list: [],
      refresh: true,
    };
    this.fetchTemps();
  }

  fetchTemps = () => {
    var newList = [];
    // var list = this.getRandom(this.state.cities, 7);
    var list = this.state.cities;
    for (let city in list) {
      var name = list[city].name;
      var country = list[city].country;
      this.fetchCityTemp(name, country, newList);
    }
  };

  // getRandom = (arr, n) => {
  //   var result = new Array(n),
  //     len = arr.length,
  //     taken = new Array(len);
  //   while(n--) {
  //     var x = Math.floor(Math.random() * len);
  //     result[n] = arr[x in taken ? taken[x] : x];
  //     taken[x] = --len in taken ? taken[len] : len;
  //   }
  //   return result;
  // }

  // loadNewTemps = () => {
  //   this.setState({
  //     list: [],
  //     refresh: true
  //   })
  //   this.fetchTemps();
  // }

  fetchCityTemp = (city, country, newList) => {
    fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        ',' +
        country +
        '&appid=ea25cd16e1d019547267f59cb4dc83e2&units=metric'
    )
      .then(response => response.json())
      .then(responseJson => {
        var r = responseJson.main;
        var obj = responseJson;
        var city = {
          name: obj.name,
          country: country,
          temp: Math.ceil(r.temp),
          type: obj.weather[0].main,
          desc: 'Humidity: ' + r.humidity + '% - ' + obj.weather[0].main,
        };
        newList.push(city);
        this.setState({
          list: newList,
          refresh: false,
        });
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
        <FlatList
          styles={ styles.fullWidth }
          data={this.state.list}
          /*refreshing={this.state.refresh}
          onRefresh={this.loadNewTemps}*/
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              underlayColor="white"
              onPress={() => alert(item.desc)}>
              <LinearGradient
                colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}
                start={[0, 0.05]}>
                <View style={styles.row}>
                  <Text
                    style={[
                      this.getTempRange(item.temp) == 1 ? styles.cold : null,
                      this.getTempRange(item.temp) == 2 ? styles.medium : null,
                      this.getTempRange(item.temp) == 3 ? styles.hot : null,
                      this.getTempRange(item.temp) == 4 ? styles.vhot : null,
                      styles.temp,
                    ]}>
                    {this.getEmoji(item.type)} {item.temp}°C
                  </Text>
                  <Text style={styles.cityN}>{item.name}</Text>
                </View>
              </LinearGradient>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    width: '100%',
    backgroundColor: '#fff',
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
  },
  temp: {
    fontSize: 30,
    lineHeight: 40,
    width: 130,
    marginRight: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  fullWidth: { width: '100%' },
  cold: { color: 'blue' },
  medium: { color: 'green' },
  hot: { color: 'orange' },
  vhot: { color: 'red' },
});
