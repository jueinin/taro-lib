import Taro, { Component } from '@tarojs/taro';
import { View, Image, Checkbox } from '@tarojs/components';
import Config = Taro.Config;
import { computed, observable } from 'mobx';
import classNames from 'classnames';
import { StoreContext } from '../../app';
import { get } from 'lodash';
import './shoppingCart.scss';
import { ShoppingCartItem, UserStore } from '../../store/userStore';
import { observer } from '@tarojs/mobx';
import { AtButton } from 'taro-ui';
@observer
class ShoppingCart extends Component<any, any> {
  static config: Config = {
    navigationBarTitleText: '购物车',
  };
  static contextType = StoreContext;
  @observable isEditing: boolean = false;
  @observable userStore: UserStore;
  componentDidMount(): void {
    this.userStore = this.context.userStore;
  }
  @computed get sumPrice() {
    return this.userStore.userData.shoppingCart.items
      .filter(item => item.checked)
      .map(item => item.price * item.count)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
      .toFixed(2);
  }
  @computed get allCount() {
    return this.userStore.userData.shoppingCart.items.filter(item => item.checked).length;
  }
  @computed get allChecked() {
    return (
      this.userStore.userData.shoppingCart.items.length ===
      this.userStore.userData.shoppingCart.items.filter(item => item.checked).length
    );
  }

  onCheckAll = () => {
    let checkedLength = this.userStore.userData.shoppingCart.items.filter(item => item.checked)
      .length;
    this.userStore.userData.shoppingCart.items = this.userStore.userData.shoppingCart.items.map(
      item => {
        item.checked = checkedLength !== this.userStore.userData.shoppingCart.items.length;
        return item;
      },
    );
  };
  onEditClick = () => {
    this.isEditing = true;
  };
  onEditFinish = () => {
    this.isEditing = false;
  };
  render() {
    if (!this.userStore) {
      return <View>null</View>;
    }
    return (
      <View className={'shopping-cart-page'}>
        <View className={'nav'}>
          <View className={classNames(this.isEditing ? 'editing' : 'manage')}>
            {this.isEditing ? (
              <AtButton onClick={this.onEditFinish}>完成</AtButton>
            ) : (
              <AtButton onClick={this.onEditClick}>编辑</AtButton>
            )}
          </View>
        </View>
        <View className={'list'}>
          {this.userStore.userData.shoppingCart.items.map(value => {
            console.log(value.checked, 'checked');
            return (
              <View className={'cart-item'} key={value.bookId}>
                <View className={'checkbox'}>
                  <Checkbox
                    checked={value.checked}
                    value={''}
                    onClick={() => {
                      value.checked = !value.checked;
                    }}
                  />{value.checked?'checked':"unchecked"}
                </View>
                <View className={'content'}>
                  <View className={'img'}>
                    <Image src={value.smallImage} />
                  </View>
                  <View className={'detail'}>
                    <View className={'title'}>{value.title}</View>
                    <View className={'tips'}>{}</View>
                    <View className={'bottom'}>
                      <View className={'price'}>{value.price}元</View>
                      <View className={'counter'}>counter</View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <View className={'bottom-bar'}>
          <View className={'select-all'}>
            <Checkbox value={''} checked={this.allChecked} onClick={this.onCheckAll} />
            <View>全选</View>
          </View>
          {this.isEditing ? (
            'editing'
          ) : (
            <View className={'settlement'}>
              <View className={'sum'}>合计</View>
              <View className={'price'}>{this.sumPrice}元</View>
              <AtButton className={'settle-btn'}>
                结算{this.allCount && ` (${this.allCount})`}
              </AtButton>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default ShoppingCart;
