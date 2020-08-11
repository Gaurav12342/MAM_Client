import React from 'react';
import { withRouter } from "react-router-dom";
import { CREATE_USER } from '../GraphQL/Mutations';
import client from '../../../Apollo';
import { Form } from 'antd';
import { setToastNotification } from '../../Request/Css/RequestStyled';
import { HeadContainer, AntRow, AntColImage, AntColForm, AntInputText, AntInputLabel, AntForm, AntFormTitle, AntButton, LinkButton, AntLinkLabel } from "../CSS/LoginStyled";
import Login_Image from "../../../images/Login_Image.jpg";
import "../../auth/CSS/Login.css";

const Registration = (props) => {

  const submitForm = (values, error) => {
    if (!error) {
      client.mutate({
        mutation: CREATE_USER,
        variables: {
          email: values.email,
          name: values.name
        },
      })
        .then(() => {
          setToastNotification('success', 'User', 'User Create Successfully.');
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
          <AntForm onFinish={submitForm}>
            <AntFormTitle>Registration To MAM</AntFormTitle>

            <AntInputLabel>Name</AntInputLabel>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
              hasFeedback >
              <AntInputText />
            </Form.Item>

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
              ]} hasFeedback >
              <AntInputText />
            </Form.Item>

            <AntButton type="primary" size="large" htmlType="submit">
              Send to mail
            </AntButton><br />
            <AntLinkLabel type="secondary"> Do you have account ? <LinkButton href="/" > Sign In </LinkButton>  </AntLinkLabel>
          </AntForm>
        </AntColForm>
      </AntRow>
    </HeadContainer>
  )
}

export default withRouter(Registration);