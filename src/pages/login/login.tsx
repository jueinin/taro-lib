import Taro,{atMessage,showToast} from '@tarojs/taro';
import { OpenData, View } from '@tarojs/components';
import './login.scss'
import { AtButton, AtIcon, AtInput, AtMessage } from 'taro-ui';
import useState = Taro.useState;
import { useAsync } from '../../common/hooks';
import redirectTo = Taro.redirectTo;
import request = Taro.request;
import { apiPrefix } from '../../common/constants';
import { withToken, wxRequest } from '../../common/utils';
import setStorageSync = Taro.setStorageSync;
import navigateBack = Taro.navigateBack;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {run:toLogin,loading:loginLoading} = useAsync(() => {
    return wxRequest({
      url: `${apiPrefix}/login`,
      method: 'POST',
      data: {
        email,password
      },
    });
  },{
    manual: true,
    onSuccess: data => {
      if (data.data.message) {
        showToast({
          title: data.data.message,
          icon: 'none',
        })
      } else {
        showToast({
          mask: true,
          title: '成功登录！',
        });
        setStorageSync('login', 'y');
        navigateBack();
      }
    }
  });
  const toSignUp = () => {
    redirectTo({
      url: '/pages/signUp/signUp',
    });
  };
  const loginDisabled = !(email && password)
  return <View className={'login-page page'}>
    <OpenData type={'userAvatarUrl'}></OpenData>
    <View className={'form'}>
      <View className={'input-bar'}>
        <AtIcon value={'user'} className={email===''?'darken':''}/>
        <View className={'input-wrapper'}>
          <AtInput className={'input'} name={'email'} placeholder={'输入您的邮箱'} clear value={email} onChange={setEmail}
                   type={'email'}/>
        </View>
      </View>
      <View className={'input-bar'}>
        <AtIcon value={'lock'} className={password===''?'darken':''}/>
        <View className={'input-wrapper'}>
          <AtInput className={'input'}  name={'password'} placeholder={'输入您的密码'} clear value={password} onChange={setPassword}
                   type={'password'}/>
        </View>
      </View>
      <View className={'submit'}>
        <AtButton className={'signup'} type={'primary'} onClick={toLogin} disabled={loginDisabled}>登录</AtButton>
      </View>
      <View>
        <AtButton className={'to-signUp'} onClick={toSignUp}>没有账号？立即注册</AtButton>
      </View>
    </View>
  </View>
};
export default Login;
