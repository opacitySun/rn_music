import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Constant from '../../common/constant';
	
class findMusicList extends Component{
	constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      //网络请求状态
      error: false,
      errorInfo: "",
      dataArray: []
    }
  }

  navigate(pageName,params){
  	this.props.navigation.navigate(pageName,params?params:{});
  }

	fetchData() {
		let resArr = [];
		fetch(Constant.DataUrl+'/getMusicList', {
		  method: 'GET',
		  mode: 'cors'
		}).then((res) => 
			res.json()
		).then((resJson) => {
			// Alert.alert("result:"+JSON.stringify(resJson.result));
			let resJsonArr = resJson.result;
			for(var k in resJsonArr){
				resJsonArr[k]["href"] = Constant.DataUrl+"/music-detail/"+resJsonArr[k].id;
				resArr.push(resJsonArr[k]);
			}
			this.setState({
        //复制数据源
        dataArray: resArr,
        isLoading: false
      });
      resArr = null;
      resJsonArr = null;
		}).catch((err) => {
			// Alert.alert('系统错误：'+err);
			this.setState({
        error: true,
        errorInfo: err
      });
		}).done();
	}

	componentDidMount() {
    //请求数据
    this.fetchData();
  }

	_keyExtractor = (item, index) => item.id;

	_clickItem(item,index) {
    this.navigate('MusicDetail',{'id':item.id});
  }

	_renderItem = ({item,index}) => {
		return (
			<TouchableOpacity
        activeOpacity={0.5}
        onPress={this._clickItem.bind(this, item, index)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
		)
	}

  renderData(){
  	return (
  		<View>
				<FlatList data={this.state.dataArray} renderItem={this._renderItem} keyExtractor={this._keyExtractor} />
			</View>
  	)
  }

	render(){
		return this.renderData();
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default findMusicList;