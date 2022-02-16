import Taro, { Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './areaDetail.less'

import Login from '../../components/login/index'

export default class Areadetail extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='areaDetail'>
        <Login/>
      </View>
    )
  }
}
