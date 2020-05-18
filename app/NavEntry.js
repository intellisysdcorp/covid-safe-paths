import React from 'react';  
import { View } from 'react-native';  
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './views/DR/HomeScreen/index.js';
import NewsScreen from './views/DR/News.js';

import Icon from 'react-native-vector-icons/Ionicons';

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
