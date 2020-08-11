import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../auth/CSS/Login.css';
import client from '../../../Apollo';
import { LOGIN_USER } from '../GraphQL/Mutations';
import { setToastNotification } from '../../Request/Css/RequestStyled';
import { Form } from 'antd';
import { HeadContainer, AntRow, AntColImage, AntColForm, AntInputText, AntInputLabel, AntForm, AntFormTitle, AntButton, LinkButton, AntInputPassword, AntLinkLabel } from "../CSS/LoginStyled";
import Login_Image from "../../../images/Login_Image.jpg";

const Login = (props) => {
    const onFinish = (values, error) => {
        const { email, password } = values;
        if (!error) {
            client.mutate({
                mutation: LOGIN_USER,
                variables: { email, password },
            })
                .then(({ data: { login: { token } } }) => {
                    localStorage.setItem('access_token', `Bearer ${token}`);
                    setToastNotification('success', 'User', 'User Login Successfully.');
                    props.history.push('/request-list');
                })
                .catch(() => {
                    setToastNotification('error', 'User', 'Please enter valid credential.');
                })
        }
    };

    return (
        <HeadContainer>
            <AntRow>
                <AntColImage>
                    <img src={Login_Image} alt="Some Images" className="ImgOpacity" height="100%" width="100%" />
                    <h1 className="H1">Welcome Back!</h1>
                    <p className="P">  To keep Connected with us please login here with your details </p>
                </AntColImage>
                <AntColForm>
                    <AntForm onFinish={onFinish}>
                        <AntFormTitle>Login To MAM</AntFormTitle>
                        <AntInputLabel>Email</AntInputLabel>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                            hasFeedback >
                            <AntInputText />
                        </Form.Item>

                        <AntInputLabel>Password</AntInputLabel>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback >
                            <AntInputPassword />
                        </Form.Item>
                        <LinkButton href="forgotPassword">Forgot password</LinkButton>
                        <AntButton type="primary" size="large" htmlType="submit"> Login </AntButton><br />
                        <AntLinkLabel type="secondary"> Don't have account ? <LinkButton href="registration" > Sign Up </LinkButton> </AntLinkLabel>
                    </AntForm>
                </AntColForm>
            </AntRow>
        </HeadContainer>
    )
}
export default withRouter(Login);
