import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../auth/CSS/Login.css';
import { Form } from 'antd';
import client from '../../../Apollo';
import { FORGOT_PASSWORD } from '../GraphQL/Mutations';
import { setToastNotification } from '../../Request/Css/RequestStyled';
import { HeadContainer, AntRow, AntColImage, AntColForm, AntInputText, AntInputLabel, AntForm, AntFormTitle, AntButton, LinkButton } from '../../auth/CSS/LoginStyled';
import Login_Image from '../../../images/Login_Image.jpg';


const ForgotPassword = (props) => {

    const submitForgotPassword = (values, error) => {
        const { email } = values;
        if (!error) {
            client.mutate({
                mutation: FORGOT_PASSWORD,
                variables: { email }
            })
                .then(() => {
                    setToastNotification('success', 'Password', 'Get password.');
                })
                .catch(() => {
                    setToastNotification('error', 'Password', 'Not get password.');
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
                    <AntForm onFinish={submitForgotPassword} >
                        <AntFormTitle>Forgot Password To MAM</AntFormTitle>

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
                            ]} >
                            <AntInputText />
                        </Form.Item>


                        <LinkButton href="/">Login</LinkButton>

                        <AntButton type="primary" size="large" htmlType="submit" >Get password</AntButton>
                    </AntForm>
                </AntColForm>
            </AntRow>
        </HeadContainer>
    )
}

export default withRouter(ForgotPassword);