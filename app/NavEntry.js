import React from 'react';  
import {StyleSheet, View} from 'react-native';  
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import HomeScreen from './views/DR/HomeScreen/index.js';
import NewsScreen from './views/DR/News.js';

import Icon from 'react-native-vector-icons/Ionicons';

// class HomeScreen extends React.Component {  
//   render() {  
//     return (  
//         <View style={styles.container}>  
//           <Text>Home Screen</Text>  
//         </View>  
//     );  
//   }  
// }  
// class ProfileScreen extends React.Component {  
//   render() {  
//     return (  
//         <View style={styles.container}>  
//           <Text>Profile Screen</Text>  
//         </View>  
//     );  
//   }  
// }  
// class ImageScreen extends React.Component {  
//     render() {  
//         return (  
//             <View style={styles.container}>  
//                 <Text>Image Screen</Text>  
//             </View>  
//         );  
//     }  
// }  
// class CartScreen extends React.Component {  
//     render() {  
//         return (  
//             <View style={styles.container}>  
//                 <Text>Cart Screen</Text>  
//             </View>  
//         );  
//     }  
// }  
// const styles = StyleSheet.create({  
//     container: {  
//         flex: 1,  
//         justifyContent: 'center',  
//         alignItems: 'center'  
//     },  
// });  
const TabNavigator = createBottomTabNavigator(  
    {  
        Home: { screen: HomeScreen,  
            navigationOptions:{  
                tabBarLabel:'Home',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
                    </View>),  
            }  
        },  
        Image: { screen: NewsScreen,  
            navigationOptions:{  
                tabBarLabel:'History',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-images'}/>  
                    </View>),  
                activeColor: '#615af6',  
                inactiveColor: '#46f6d7',  
                barStyle: { backgroundColor: '#67baf6' },  
            }  
        },  
    },  
    {  
      initialRouteName: "Home",
      activeColor: '#f0edf6', 
      inactiveColor: '#226557',  
      barStyle: { backgroundColor: '#3BAD87' },
    },  
);  

const NavEntry = createAppContainer(TabNavigator);
  
export default NavEntry;  