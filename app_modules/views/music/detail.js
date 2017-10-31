import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Constant from '../../common/constant';
	
class musicDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      //网络请求状态
      error: false,
      errorInfo: "",
      dataArray: [],
      playSrc:""
    }
  }

  navigate(pageName,params){
  	this.props.navigation.navigate(pageName,params?params:{});
  }

  params = this.props.navigation.state.params;

	fetchData() {
    let id = this.params.id;
		fetch(Constant.DataUrl+'/getMusicList?id='+id, {
		  method: 'GET',
		  mode: 'cors'
		}).then((res) => 
			res.json()
		).then((resJson) => {
			// Alert.alert("result:"+JSON.stringify(resJson.result));
			let resJsonObj = resJson.result[0];
			this.setState({
        //复制数据源
        dataArray: resJson.result,
        isLoading: false,
        playSrc:resJsonObj.url
      });
      resJsonObj = null;
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

  renderData(){
  	return (
  		<View>
				
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


export default musicDetail;