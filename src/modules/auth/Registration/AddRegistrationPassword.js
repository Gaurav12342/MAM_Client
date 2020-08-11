import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';
import client from '../../../Apollo';
import { setToastNotification } from '../../Request/Css/RequestStyled';
import { HeadContainer, AntRow, AntColImage, AntColForm, AntInputLabel, AntForm, AntFormTitle, AntButton, AntInputPassword } from '../../auth/CSS/LoginStyled';
import Login_Image from '../../../images/Login_Image.jpg';
import { ADD_REGISTRATION_PASSWORD } from '../../auth/GraphQL/Mutations';
import '../../auth/CSS/Login.css';


const AddRegistrationPassword = (props) => {

  const [token, setToken] = useState("");

  useEffect(() => {
    const tempToken = props.match.params.token;
    setToken(tempToken);
  }, [props.match.params.token])

  const submitForm = (values, error) => {
    if (!error) {
      client.mutate({
        mutation: ADD_REGISTRATION_PASSWORD,
        variables: {
          token,
          password: values.password
        },
      })
        .then(() => {
          setToastNotification('success', 'User', 'Add password successfully.');
          props.history.push('/');
        })
        .catch((error) => {
          setToastNotification('error', 'User', `${error}`);
        })
    }
  }


  return (
    <HeadContainer>
      <AntRow>
        <AntColImage>
          <img src={Login_Image} alt="Some Images" className="ImgOpacity" height="100%" width="100%" />
          <h1 className="H1">Welcome Back!</h1>
          <p className="P"> To keep Connected with us please login here with your details </p>
        </AntColImage>
        <AntColForm>
          <AntForm onFinish={submitForm} >
            <AntFormTitle>Add Password to MAM</AntFormTitle>

            <AntInputLabel>New Password </AntInputLabel>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password!',
                },
              ]}
              hasFeedback >
              <AntInputPassword />
            </Form.Item>
            <br />

            <AntInputLabel>Confirm Password</AntInputLabel>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <AntInputPassword />
            </Form.Item>
            <br />
            <AntButton type="primary" htmlType="submit" >Add Password</AntButton>
          </AntForm>
        </AntColForm>
      </AntRow>
    </HeadContainer>
  )
}

export default withRouter(AddRegistrationPassword);