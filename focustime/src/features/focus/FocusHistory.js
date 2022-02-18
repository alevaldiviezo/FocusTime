import React from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';

import {paddingSizes, fontSizes} from '../../utils/sizes';
import {RoundedButton} from '../../components/RoundedButton';

//for some reason I couldn't use styles as a function and had to implement this
const historyItem = function(status) {
return {
  color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md
}
}
const HistoryItem = ({item, index}) => {
  return <Text style={historyItem(item.status)}>{item.subject}</Text>
  
  
}

export const FocusHistory = ({focusHistory, onClear}) => {
  const clearHistory = () => {
    onClear();
  }

  return(
    <>
      <SafeAreaView style={{flex:1, alignItems:"center"}}>
        {!!focusHistory.length && (
          <>
          <Text style={styles.title} >Things We've focused on</Text>
          
          <FlatList
          style={{flex:1}}
          contentContainerStyle= {{flex:1, alignItems:"center"}}
          data={focusHistory}
          renderItem={HistoryItem} 
          // keyExtractor={(item, index) => item.toString()}
          />
          <View style = {styles.clearHistory}>
            <RoundedButton size={75} title = 'Clear' onPress={() => onClear()}/>
          </View>
          </>
          )}
          
      </SafeAreaView>
      

    </>
  )
};

const styles= StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg
  },
  clearHistory:{
    padding: paddingSizes.md,
    alignItems: "center"
  }
})
