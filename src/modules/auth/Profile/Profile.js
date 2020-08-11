import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Typography, Input, Upload, Form, Button } from 'antd';
import { LoadingOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import { setToastNotification } from '../../Request/Css/RequestStyled';
import { MainDiv } from '../../auth/CSS/ProfileStyled';
import HeaderPage from "../../Header/HeaderPage";
import { GET_CURRENT_USER } from '../../auth/GraphQL/Queries';
import { UPDATE_USER } from '../../auth/GraphQL/Mutations';
import { useQuery } from "@apollo/react-hooks";
import client from '../../../Apollo';
const { Text } = Typography;


const Profile = (props) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER, { fetchPolicy: "network-only" });
  const [imageUrl, setImageUrl] = useState();
  const [load, setLoad] = useState(false);

  if (loading) return "";
  if (error) return "";

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = info => {
    getBase64(info.file.originFileObj, imageUrl => {
      setLoad(false)
      setImageUrl(imageUrl)
    });
  };

  const uploadButton = (
    <div>
      {load ? <LoadingOutlined /> : <PlusCircleTwoTone />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const submitForm = (values, error) => {
    const userImage = values.profileImage.fileList[0].originFileObj;
    values.profileImage = userImage;

    if (!error) {
      client.mutate({
        mutation: UPDATE_USER,
        variables: {
          id: data.currentUser.id,
          name: values.name,
          profileImage: values.profileImage
        },
        refetchQueries: [{
          query: GET_CURRENT_USER,
          fetchPolicy: "network-only"
        }]

      })
        .then(() => {
          setToastNotification('success', 'User Profile', 'Update profile Successfully.');
          props.history.push("/request-list");
        })
        .catch(error => {
          setToastNotification('error', 'User Profile', `${error}`);
        });
    }
  }


  return (
    <div>
      <HeaderPage />
      <MainDiv>
        <Row>
          <Col flex="200px"> <Text>Email</Text> </Col>
          <Col flex="900px"> <Input value={data.currentUser.email} disabled /> </Col>
        </Row>
        <br />
        <Form onFinish={submitForm} initialValues={{ 'name': `${data.currentUser.name}` }} >
          <Row>
            <Col flex="200px"> <Text>User Name</Text> </Col>
            <Col flex="900px">
              <Form.Item name="name">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row>
            <Col flex="200px"> <Text>Profile Image</Text> </Col>
            <Col flex="900px">
              <Form.Item name="profileImage" valuePropName={''}>
                <Upload
                  name="avatar"
                  multiple={false}
                  listType="picture-card"
                  showUploadList={false}
                  onChange={handleChange} >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                      uploadButton
                    )}
                </Upload>

              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col flex="200px"> </Col>
            <Col flex="200px">
              <Button htmlType="submit" type="primary">Submit</Button> {' '}
              <Button htmlType="submit" type="primary" onClick={() => { props.history.push("/request-list"); }}>Cancel</Button>
            </Col>
          </Row>
        </Form>
      </MainDiv>

    </div >
  )
}

export default withRouter(Profile); 