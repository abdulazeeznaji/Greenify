import React from 'react';

import {ScrollView, StyleSheet, Text, View ,TouchableOpacity,TextInput,Image} from 'react-native';
import { DB_URL } from 'react-native-dotenv';
export default class PlantProgress extends React.Component {
    constructor(){
    super();
  }

  delete = () => {
     const plant = this.props.navigation.getParam('plant');
     console.log('plant',plant._id)

  fetch(DB_URL+"/deletePlant/"+plant._id,{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
             plants : plant._id
          })
      }).then((data) => {
        alert('Deleted Successfully')
         this.props.navigation.navigate('Profile')
      })
    } 

render() {
 const plant = this.props.navigation.getParam('plant');

  return (
    <View style={styles.container}>
      <Image source={{uri:plant.imageUrl}} style={{width: 175, height: 200,margin:25}} borderRadius={20}/>
      
      <Text style={styles.text}>{plant.name}</Text>
      <View style={{borderWidth:1,borderRadius:5,margin:10}}>
      <Text style={{margin:15,fontSize:16,textAlign:'center',fontFamily:'notoserif'}}> {plant.description}</Text>
      </View>
       <TouchableOpacity onPress={this.delete}><Text style={styles.text}>delete</Text></TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#deede7',
    alignItems: "center",
    justifyContent: 'center',

  },
   input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
   },
   text:{
    fontSize:20,
    textAlign:'center',
    margin:15,
    fontWeight:'bold',
    color:'#7ead9b'
   },
  button: {
    padding:20,
    borderWidth:1,
    backgroundColor:'green'
  }
});