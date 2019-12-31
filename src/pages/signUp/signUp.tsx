import Taro,{atMessage,redirectTo,request} from '@tarojs/taro';
import { Button, Input, View } from '@tarojs/components';
import { AtButton, AtIcon, AtInput, AtMessage, AtToast } from 'taro-ui';
import useState = Taro.useState;
import { useAsync, useToggle } from '../../common/hooks';
import './signUp.scss'
import Config = Taro.Config;
import { isEmail, withToken, wxRequest } from '../../common/utils';
import { apiPrefix, mockPrefix } from '../../common/constants';
import { useCountDown } from '../../common/hooks/useCountDown';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [code, setCode] = useState('');
  let signupDisabled = !(email && password && repassword && code);
  const { state: showToast, toggle:toggleToastShow } = useToggle(false,true);

  const { processing, start:startCountDown, currentSecond } = useCountDown(10);
  const { run: getCode } = useAsync(() => {
    return wxRequest({
      url: `${apiPrefix}/sendMailCode?email=${email}`,
    });
  }, {
    manual: true,
    onSuccess: (data) => {
      if (!data.data.message) {
        toggleToastShow(true);
        setTimeout(() => toggleToastShow(false), 3000);
      } else {
        atMessage({
          type: 'error',
          message: data.data.message,
        })
      }
    }
  });

  const { run: signUp } = useAsync(() => {
    return wxRequest({
      url: `${apiPrefix}/signUp`,
      method: 'POST',
      data: {
        email: email,
        password: password,
        code: parseInt(code),
      },
    });
  }, {
    manual: true,
    onSuccess: () => {
      atMessage({
        message: '注册成功',
        type: 'success',
      });
    },
    onError: (err) => {
      atMessage({
        type: 'error',
        message: err.message,
      });
    },
  });
  const toLogin = () => {
    redirectTo({
      url: '/pages/login/login',
    });
  };
  return <View className={'login'}>
    <View className={'form'}>
      <View className={'input-bar'}>
        <AtIcon value={'user'} className={email===''?'darken':''}/>
        <View className={'input-wrapper'}>
          <AtInput className={'input'} name={'email'} placeholder={'输入注册邮箱'} clear value={email} onChange={setEmail}
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
      <View className={'input-bar'}>
        <AtIcon value={'lock'} className={repassword===''?'darken':''}/>
        <View className={'input-wrapper'}>
          <AtInput className={'input'}  name={'password'}  placeholder={'再次输入您的密码'} clear value={repassword} onChange={setRepassword}
                   type={'password'}/>
        </View>
      </View>
      <View className={'input-bar'}>
        <AtInput className={'code'} type={'number'} placeholder={'输入邮箱的验证码'} name={'code'} clear value={code} onChange={setCode}>
          <AtButton type={'primary'} onClick={()=>{
            getCode();
            startCountDown();
          }} size={'small'} disabled={!isEmail(email) || processing}>{processing?`${currentSecond}秒`:"获取验证码"}</AtButton>
        </AtInput>
      </View>
      <View className={'submit'}>
        <AtButton className={'signup'} type={'primary'} onClick={signUp} disabled={signupDisabled}>注册</AtButton>
      </View>
      <View>
        <AtButton className={'to-login'} onClick={toLogin}>已有账号？立即登录</AtButton>
      </View>
    </View>
    <AtToast text={'验证邮件发送成功！'} isOpened={showToast}/>
    <AtMessage/>
  </View>;
};
SignUp.config = {
  navigationBarTitleText: '注册',
} as Config;
export default SignUp;
