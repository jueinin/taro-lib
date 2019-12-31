import Taro,{useEffect} from '@tarojs/taro';
import './personalSetting.scss';
import { View, Text} from '@tarojs/components';
import { AtActionSheet, AtActionSheetItem, AtList, AtListItem } from 'taro-ui';
import { defaultAvatar, mockPrefix } from '../../common/constants';
import { useAsync, useToggle } from '../../common/hooks';
import request = Taro.request;
import { withToken, wxRequest } from '../../common/utils';
import chooseImage = Taro.chooseImage;

const defaultInfo = {
  data: {
    avatar: defaultAvatar,
    nickName: '',
    sex: '',
    birthday: '',
    selfIntroduction: '',
  },
};
const PersonalSetting = () => {
  const {state:avatarChooserOpen,toggle:setAvatarChooserOpen} = useToggle(false);
  const { data: info = defaultInfo,run: getInfo } = useAsync(() => {
    return wxRequest({
      url: `${mockPrefix}/personalSetting`,
    });
  },{
    manual: true
  });
  useEffect(() => {
    getInfo();
  }, []);
  const chooseImageFrom = (sourceType: 'album' | 'camera') => {

  };
  const onAvatarClick = () => {
    // setAvatarChooserOpen(true);
    chooseImage({
      count: 1,
      success:res => {
        console.log(res);
      }
    })
  };
  return <View className={'personalSetting'}>
    <AtList>
      <AtListItem className={'list-item'} title={'头像'} iconInfo={{
        value: 'user',
      }} extraThumb={info.data.avatar} onClick={onAvatarClick} arrow={'right'}/>
      <AtListItem className={'list-item'} title={'昵称'} iconInfo={{
        prefixClass: 'fa',
        value: 'heart-o',
      }} extraText={info.data.nickName} arrow={'right'}/>
      <AtListItem className={'list-item'} title={'性别'} iconInfo={{
        prefixClass: 'fa',
        value: 'mars-stroke',
      }} extraText={info.data.sex}/>
      <AtListItem className={'list-item'} title={'出生日期'} iconInfo={{
        prefixClass: 'fa',
        value: 'birthday-cake',
      }} extraText={info.data.birthday || '输入您的生日'}/>
      <AtListItem className={'list-item'} title={'个人介绍'} iconInfo={{
        prefixClass: 'fa',
        value: 'address-card-o',
      }} extraText={info.data.birthday || '介绍一下自己吧！'}/>
    </AtList>
    {/*<AtActionSheet isOpened={avatarChooserOpen} cancelText={'取消'} onCancel={() => setAvatarChooserOpen(false)}*/}
    {/*               onClose={() => setAvatarChooserOpen(false)}>*/}
    {/*  <AtActionSheetItem><Text className={'camera'}>拍照</Text></AtActionSheetItem>*/}
    {/*  <AtActionSheetItem><Text className={'image-chooser'}>从相册里选择</Text></AtActionSheetItem>*/}
    {/*</AtActionSheet>*/}
  </View>;
};
export default PersonalSetting;
