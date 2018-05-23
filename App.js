import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  getDetails = (character) => {
    const films = Promise.all(character.films.map((film) => {
      return fetch(film)
        .then(f => f.json()) //fuck you
    })).then((details) => {
      this.setState({details})
    })
  }

  constructor(){
    super()
    this.state = {
      results: [],
      details: [],
    }
  }
  componentDidMount(){
    fetch('https://swapi.co/api/people/')
      .then((r) => r.json())
      .then(({results}) => this.setState({results}))
  }

  render() {
    return (
      <View styles={styles.container}>
        <Menu results={this.state.results} callback={this.getDetails}/>
        <Details details={this.state.details}/>
      </View>
    );
  }
}

const Menu = (props) => {
  return (
    <View styles={styles.subjectList}>
      {props.results.map((character, i) => {
        return (
          <Button
            key={i}
            title={character.name}
            onPress={() => props.callback(character)}
            color="#00FF00"/>
        )
      })}
    </View>
  )
}

const Details = ({details}) => {
  return (
    <View>
      <Text>Films they've appeared in</Text>
      {
        details.map((film, i) => {
          return (
            <Text key={i}>
              {film.title}
            </Text>
          )
        })
      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  subjectList: {
    flex: 1
  },
  subject: {
    flex: 3
  }
});
