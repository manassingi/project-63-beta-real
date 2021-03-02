import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';

import { Header } from 'react-native-elements';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed:false,
      word:"Loading...",
      lexicalCategory:'',
      defination:''
    };
  }
  getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url ="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    return fetch(url)
    .then((data)=>{
      if(data.status===200)
      {
        return data.json()
      }
      else
      {
        return null
      }
    })
    .then((response)=>{
      var responseObject = response

      if (responseObject)
      {
        var wordData = responseObject.defination[0]
        var defination=wordData.description
        var lexicalCategory=wordData.wordtype

        this.setState({
          "word":this.state.text,
          "definition":defination,
          "lexicalCategory":lexicalCategory
        })
      }
      else
      {this.setState({
        "word":this.state.text,
        "definition":"Not Found",
      })
    }
    })
  }
  render(){
    return(
      <View style={styles.container}>
         <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'Pocket Dictonary',
            style: { color: '#fff', fontSize: 20 },
          }}
        />
        <TextInput
        styles={styles.inputBox}
        onChangeText={text => {
          this.setState({
            text:text,
            isSearchPressed:false,
            word:"Loading...",
            lexicalCategory:'',
            defination:""
          })
        }}
        value={this.state.text}
        />
        <TouchableOpacity
        style={styles.searchButton}
        onPress={()=> {
          this.setState({isSearchPressed:true});
          this.getWord(this.state.text)
        }}></TouchableOpacity>
          
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>
              Word :{" "}
              </Text>
              <Text style={{fontSize:18}}>
                {this.state.word}
                </Text>
                </View>
                <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>
              Type :{" "}
              </Text>
              <Text style={{fontSize:18}}>
                {this.state.lexicalCategory}
                </Text>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                  <Text style={styles.detailsTitle}>
                    Definition:{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                    {this.state.definition}
                    </Text>
                    
        </View>
       
   </View>       


    )
  }
}
const styles= StyleSheet.create({
  container:{
    flex:1,
  },
  inputBoxcontainer:{
    flex:3.0,
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox:{
    width:'80%',
    alignSelf:'center',
    height:40,
    borderWidth:20
  },
  detailsContainer:{
    height:40,
    alignSelf:'center',
    width:'50%',
    backgroundColor:'yellow'
  }
})