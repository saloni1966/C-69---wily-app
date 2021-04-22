import React from 'react';
import {Text,TouchableOpacity,View,StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
export default class TransactionScreen extends React.Component{

    constructor(){
        super();
        this.state={
            hasCamPermission : null,
            scanned : false,
            buttonState : "normal",
            scannedData : " "
        }
    }

    getCameraPermissions = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
        this.setState({
         
          hasCameraPermissions: status === "granted",
          buttonState: 'clicked',
          scanned: false,
          scannedData : "Hello  i am ready to scan"
        });
      }
      handlebarcodescanner= async({type,data})=>{
          this.setState({
              scanned :  true,
             buttonState : 'normal',
             scannedData : data
            
          })

      }


   
    render(){

        if(this.state.hasCameraPermissions === true  && this.state.buttonState=== "clicked"){
            return(
         
           
                <View style={styles.container}>
        
                   
                    <BarCodeScanner  onBarCodeScanned={this.state.scanned? "no data yet":this.handlebarcodescanner}
                    style={StyleSheet.absoluteFillObject}>

                    </BarCodeScanner>
      
                   
    
                </View>
                );
                
        }
        else if (this.state.buttonState === "normal"){
            return(
         
           
                <View style={styles.container}>
        
                  
                    <Text>
                       {this.state.hasCamPermission?this.state.scannedData:"Request for camera Permission"}
                    </Text>
    
      
                    <TouchableOpacity 
                        style={styles.scanButton}
                        onPress={this.getCameraPermissions}
                     >
                        <Text>Scanner QR code</Text>
                    </TouchableOpacity>
    
                </View>
                );

        }
        
        
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 0
    },
    buttonText:{
      fontSize: 20,
    }
  });
