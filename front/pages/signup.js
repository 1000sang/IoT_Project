import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';
import FirebaseSignUpForm from '@iso/containers/FirebaseForm/FirebaseForm';
import authAction from '@iso/redux/auth/actions';
import appActions from '@iso/redux/app/actions';
import Auth0 from '../authentication/Auth0';
import IntlMessages from '@iso/components/utility/intlMessages';
import SignUpStyleWrapper from '../styled/SignUp.styles';
import axios from 'axios';

import userAction from '../redux/user/actions'

const { signup } = userAction;
const { login } = authAction;
const { clearMenu } = appActions;

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isSignedUp, signUpError } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (isSignedUp) {
      router.replace('/');
    }
  }, [isSignedUp])

  useEffect(() => {
    if (signUpError) {
      // console.log(signUpError)
      alert(signUpError)
    }
  }, [signUpError]);

  // const handleLogin = (token = false) => {
  //   console.log(token, 'handlelogin');
  //   if (token) {
  //     dispatch(login(token));
  //   } else {
  //     dispatch(login());
  //   }
  //   dispatch(clearMenu());
  //   history.push('/dashboard');
  // };
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = useCallback(() => {
    if (password !== passwordConfirm) {
      return setPasswordError(true)
    }
    const data = {
      email: email,
      nickname: nickname,
      password: password
    };

    // const requestSignUp = async () => {
    //   try {
    //     const res = await axios.post(
    //       `${process.env.BACKEND_URL}/user`,
    //       data
    //     )
    //     console.log(res)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
    // requestSignUp();
    dispatch(signup(data))
  }, [email, nickname, password, passwordConfirm])

  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link href="/dashboard">
              <IntlMessages id="page.signUpTitle" />
            </Link>
          </div>

          <form className="isoSignUpForm" onSubmit={(e) => [
            e.preventDefault()
          ]} >
            {/* <div className="isoInputWrapper isoLeftRightComponent">
              <Input size="large" placeholder="First name" />
              <Input size="large" placeholder="Last name" />
            </div> */}

            <div className="isoInputWrapper">
              <Input
                id="email"
                size="large"
                placeholder="Email"
                onChange={useCallback((e) => {
                  setEmail(e.target.value)
                }, [])}
              />
            </div>

            <div className="isoInputWrapper">
              <Input
                id="nickname"
                size="large"
                placeholder="Nickname"
                onChange={useCallback((e) => {
                  setNickname(e.target.value)
                }, [])}
              />
            </div>

            <div className="isoInputWrapper">
              <Input
                id="password"
                size="large"
                type="password"
                placeholder="Password"

                onChange={useCallback((e) => {
                  setPassword(e.target.value)
                }, [])}
              />
            </div>

            <div className="isoInputWrapper">
              <Input
                id="passwordConfirm"
                size="large"
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={useCallback((e) => {
                  setPasswordConfirm(e.target.value);
                  setPasswordError(e.target.value !== password)
                }, [password])}
              />
              {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
            </div>

            {/* <div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
              <Checkbox>
                <IntlMessages id="page.signUpTermsConditions" />
              </Checkbox>
            </div> */}

            <div className="isoInputWrapper">
              <Button type="primary" onClick={handleSubmit}>
                <IntlMessages id="page.signUpButton" />
              </Button>
            </div>
            {/* <div className="isoInputWrapper isoOtherLogin">
              <Button
                onClick={handleLogin}
                type="primary"
                className="btnFacebook"
              >
                <IntlMessages id="page.signUpFacebook" />
              </Button>
              <Button
                onClick={handleLogin}
                type="primary"
                className="btnGooglePlus"
              >
                <IntlMessages id="page.signUpGooglePlus" />
              </Button>
              <Button
                onClick={() => {
                  Auth0.login();
                }}
                type="primary"
                className="btnAuthZero"
              >
                <IntlMessages id="page.signUpAuth0" />
              </Button>

              <FirebaseSignUpForm
                signup={true}
                history={router}
                login={() => dispatch(login())}
              />
            </div> */}
            <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
              <Link href="/signin">
                <IntlMessages id="page.signUpAlreadyAccount" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </SignUpStyleWrapper>
  );
}
