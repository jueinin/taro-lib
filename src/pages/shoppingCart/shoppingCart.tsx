import Taro, { Component } from '@tarojs/taro';
import { View,Image } from '@tarojs/components';
import Config = Taro.Config;
import { observable } from 'mobx';
import classNames from 'classnames';
import { StoreContext } from '../../app';
import { get } from 'lodash';
import { ShoppingCartItem } from '../../store/userStore';
class ShoppingCart extends Component<any, any>{
  static config: Config = {
    navigationBarTitleText: '购物车',
  };
  static contextType = StoreContext;
  @observable isEditing: boolean = false;
  @observable userStore = this.context.userStore;
  render() {
    debugger;
    return <View className={'shopping-cart-page'}>
      <View className={'nav'}>
        <View className={classNames(this.isEditing ? 'editing' : 'manage')}>{}</View>
      </View>
      <View className={'list'}>
        {get<ShoppingCartItem[]>(this.userStore.userData, 'shoppingCart.items', []).map(value => {
          return <View className={'cart-item'}>
            <View className={'checkbox'}>
              checkbox
            </View>
            <View className={'content'}>
              <View className={'img'}>
                <Image src={value.smallImage}/>
              </View>
              <View className={'detail'}>
                <View className={'title'}>{value.title}</View>
                <View className={'tips'}>{}</View>
                <View className={'bottom'}>
                  <View className={'price'}>{ value.price}</View>
                  <View className={'counter'}>counter</View>
                </View>
              </View>
            </View>
          </View>
        })}
      </View>
    </View>;
  }
}

export default ShoppingCart;
