
import {openDatabase} from 'expo-sqlite';

class Test extends React.Component{
  constructor(){
    super();
    var db = openDatabase('equiday_db');

    db.transaction(
      tx => {
        console.log("This is printed");
        tx.executeSql(
          'create table test1(id smallint primary key, test varchar(10));',
          [],
          (tx, results) => {
            console.log("Executed query");
          },
          (tx, error) => {
            console.log("Could not execute query: " + error);
          }
        );
      },
      error => {
        console.log("Transaction error");
      },
      () => {
        console.log("Transaction done");
      }
    );
  }
  render(){
    return <Text>Opened</Text>;
  }
}
