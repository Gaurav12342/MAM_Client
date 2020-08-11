import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';
import client from '../../../Apollo';
import { CHANGE_PASSWORD } from '../../auth/GraphQL/Mutations';
import { setToastNotification } from '../../Request/Css/RequestStyled';
import { HeadContainer, AntRow, AntColImage, AntColForm, AntInputLabel, AntForm, AntFormTitle, AntButton, AntInputPassword, LinkButton } from '../../auth/CSS/LoginStyled';
import Login_Image from '../../../images/Login_Image.jpg';
import '../../auth/CSS/Login.css';


const ChangePassword = (props) => {

    const submitForm = (values, error) => {
        if (!error) {
            client.mutate({
                mutation: CHANGE_PASSWORD,
                variables: {
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword
                }
            })
                .then(() => {
                    setToastNotification('success', 'User', 'Change Password Successfully.');
                    props.history.push('/');
                })
                .catch(() => {
                    setToastNotification('error', 'User', 'Please enter valid credential.');
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
                        <AntFormTitle>Change Password</AntFormTitle>

                        <AntInputLabel>Old Password </AntInputLabel>
                        <Form.Item
                            name="currentPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your old password!',
                                },
                            ]}
                            hasFeedback >
                            <AntInputPassword />
                        </Form.Item>


                        <AntInputLabel>New Password </AntInputLabel>
                        <Form.Item
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your new password!',
                                },
                            ]}
                            hasFeedback >
                            <AntInputPassword />
                        </Form.Item>


                        <AntInputLabel>Confirm Password</AntInputLabel>
                        <Form.Item
                            name="confirm"
                            dependencies={['newPassword']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The passwords you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <AntInputPassword />
                        </Form.Item>
                        <AntButton type="primary" htmlType="submit" >Change</AntButton>
                        <LinkButton href="request-list" > Back </LinkButton>
                    </AntForm>
                </AntColForm>
            </AntRow>
        </HeadContainer>
    )
}

export default withRouter(ChangePassword);