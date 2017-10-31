import { StackNavigator, TabNavigator } from 'react-navigation';
import Index from '../views/index';
import FindList from '../views/music/findList';
import MusicDetail from '../views/music/detail';

const App = StackNavigator(
  {
  	Index: {
  		screen: Index,
  		navigationOptions: {
        title:'首页'
      }
  	},
  	FindList: {
  		screen: FindList,
  		navigationOptions: {
        // headerLeft: null,
        title:'发现音乐'
      }
  	},
    MusicDetail: {
      screen: MusicDetail,
      navigationOptions: {
        // headerLeft: null,
        title:'详情'
      }
    }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
			// headerTitle:'FW音乐小屋',
      headerStyle: {
        backgroundColor: '#3e9ce9'
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 20
      },
      headerTintColor: '#fff'
    }
  }
);

export default App;

