import  React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Platform, AsyncStorage } from 'react-native';
import {TextInput} from 'react-native-paper';
import {Focus} from './src/features/focus/Focus'
import {FocusHistory} from './src/features/focus/FocusHistory';
import {Timer} from './src/features/timer/Timer'
import {colors} from './src/utils/colors'
import {paddingSizes} from './src/utils/sizes'


export default function App() {

  const STATUSES = {
    COMPLETED:1,
    CANCELLED:2
  }

  const [focusSubject, setFocusSubject]= useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, {key:String(focusHistory.length+1) ,subject,status}])
  };

  const onClear = () => {
    //clear the list
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try{
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    }catch(e){
      console.log(e);
    }
  }

  const loadFocusHistory = async () => {
    try{
      const history = await AsyncStorage.getItem('focusHistory');

      if(history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history));
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadFocusHistory();
  },[])

  useEffect(() => {
    saveFocusHistory();
  },[focusHistory]);
  
  console.log(focusHistory);
  return (
    <View style={styles.container}>
    {focusSubject? (
      <Timer focusSubject = {focusSubject} 
      onTimerEnd={()=>{
        addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETED);
        setFocusSubject(null);
        }
      }
      
      clearSubject = {() => { 
      addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
      setFocusSubject(null);
      }}
      />
    ):(
      <>
      <Focus addSubject={setFocusSubject}/>
      <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
      </>
      )}
    <Text>{focusSubject}</Text>
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS ==='ios' ? paddingSizes.md : paddingSizes.lg,
    backgroundColor: colors.darkBlue
  },
  
});
