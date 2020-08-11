import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import '../../auth/CSS/Login.css';
import { Form } from 'antd';
import client from '../../../Apollo';
import { RESET_PASSWORD } from '../GraphQL/Mutations';
import { setToastNotification } from '../../Request/Css/RequestStyled';
import { HeadContainer, AntRow, AntColImage, AntColForm, AntInputLabel, AntForm, AntFormTitle, AntButton, AntInputPassword } from "../../auth/CSS/LoginStyled";
import Login_Image from "../../../images/Login_Image.jpg";



const ForgotResetPassword = (props) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const tempToken = props.match.params.token;
    setToken(tempToken);
  }, [props.match.params.token])


  const submitResetPassword = (values, error) => {
    if (!error) {
      client.mutate({
        mutation: RESET_PASSWORD,
        variables: {
          token,
          newPassword: values.newPassword
        }
      })
        .then(() => {
          setToastNotification('success', 'Reset Password', 'Password reset successfully.');
          props.history.push('/');

        })
        .catch((error) => {
          setToastNotification('error', 'Reset Password', 'Password reset failed.');
        })
    }

  }

  return (
    <HeadContainer>
      <AntRow>
        <AntColImage>
          <img
            src={Login_Image}
            alt="Some Images"
            className="ImgOpacity"
            height="100%"
            width="100%"
          />
          <h1 className="H1">Welcome Back!</h1>
          <p className="P">
            {" "}
            To keep Connected with us please login here with your details{" "}
          </p>
        </AntColImage>
        <AntColForm>
          <AntForm onFinish={submitResetPassword}>
            <AntFormTitle>Reset Password To MAM</AntFormTitle>
            <AntInputLabel>New Password</AntInputLabel>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Please enter your new password!',
                },
              ]}
              hasFeedback >
              <AntInputPassword />
            </Form.Item>
            <br />
            <AntButton type="primary" size="large" htmlType="submit">
              Reset password
            </AntButton>
          </AntForm>
        </AntColForm>
      </AntRow>
    </HeadContainer>
  )
}

export default withRouter(ForgotResetPassword);