/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import client from "../../../Apollo";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Form, Button, Typography, Avatar, Row, Col, Card, Modal, Select, Upload, Tag } from "antd";
import { ArrowLeftOutlined, UserAddOutlined } from '@ant-design/icons';
import { ContentRow, InputText } from "../../Request/Css/CreateRequestStyled";
import { Profile, Li } from "../../Request/Css/RequestStyled";
import { RootDiv, SmallText } from "../../Request/Css/GetDetailStyled";
import { GET_ALL_USERS, GET_ALL_ASSETS_REQUEST } from "../../Request/GraphQL/Queries";
import { UPDATE_SHARE_WITH_USER } from "../../Request/GraphQL/Mutations";
import { setToastNotification } from "../../Request/Css/RequestStyled";
import { get } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
const { Option } = Select;
const { Title } = Typography;

const GetRequestDetail = props => {
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_ALL_USERS, { fetchPolicy: "network-only" });

  const [previewVisible, setPreviewVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');


  const fileList = props && props.getRequestData && props.getRequestData.getAssetRequest && props.getRequestData.getAssetRequest.fileUrls && props.getRequestData.getAssetRequest.fileUrls.map((image, key) => {
    return {
      uid: key,
      name: image.split("\\").pop().split("/").pop(),
      url: image,
    };
  });

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const showShareWithModal = () => {
    setVisible(true)
  };

  const CollectionShareForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Share with other user"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}

        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }} >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal" >
          <Form.Item name="shareWith" >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Select users"
              optionLabelProp="label" >
              {
                get(userData, 'getUsers').map((userEmail) => {
                  return (
                    <Option key={userEmail.email}> {userEmail.email} </Option>
                  )
                })
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal >
    );
  };

  const onCreate = (values, error) => {
    setVisible(false);
    if (!error) {
      client.mutate({
        mutation: UPDATE_SHARE_WITH_USER,
        variables: {
          shareWith: values.shareWith,
          id: props.match.params.id
        },
        refetchQueries: [
          {
            query: GET_ALL_ASSETS_REQUEST,
            fetchPolicy: "network-only",
          },
        ],
      })
        .then(() => {
          setVisible(false)
          setToastNotification('success', 'User', 'Share to another user successfully.');
        })
        .catch(error => {
          setToastNotification('error', 'User', `${error}`);
        });
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    setPreviewImage({ fileList })
  }


  if (userLoading) return "";
  if (userError) return "";

  const gridStyle = {
    width: "100%",
    textAlign: "left",
  };

  return (
    <Form>
      <RootDiv>
        <Card>
          <Card.Grid style={gridStyle}>
            <ContentRow>
              <Col span={1}>
                <ArrowLeftOutlined onClick={() => { props.history.push("/request-list") }} />
              </Col>
              <Col span={19}>
                <Title level={3}>{props.getRequestData.getAssetRequest.title}</Title>
              </Col>
              <Col span={4}>
                <Profile>
                  {props && props.getRequestData && props.getRequestData.getAssetRequest && props.getRequestData.getAssetRequest.shareWith && props.getRequestData.getAssetRequest.shareWith.map((images, index) => {
                    while (index < 10) {
                      return <Li key={index}>
                        {
                          images.profileImage ? (<Avatar src={images.profileImage} />) : (<Avatar style={{ backgroundColor: " #9fff80" }}>{images.email.charAt(0).toUpperCase()}</Avatar>)
                        }
                      </Li>
                    }
                    return null
                  })}
                  <Li>
                    <Button type="dashed" shape="circle" icon={<UserAddOutlined />} onClick={showShareWithModal} />
                    <CollectionShareForm
                      visible={visible}
                      onCreate={onCreate}
                      onCancel={() => {
                        setVisible(false);
                      }}
                    />
                  </Li>
                </Profile>
              </Col>
            </ContentRow>

            <Row>
              <Col>
                <SmallText type="secondary">
                  Created on {props.getRequestData.getAssetRequest.updatedAt} ,
                </SmallText>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                <SmallText type="secondary"> <br /> Description : </SmallText>
              </Col>
            </Row>
            <Row>
              <Col>
                <SmallText type="secondary">
                  {props.getRequestData.getAssetRequest.description}
                </SmallText>
              </Col>
            </Row>

            <Row>
              <br />
              <Col span={6}>
                <SmallText type="secondary"> <br /> Due Date : </SmallText>
              </Col>
              <Col span={6}>
                <SmallText type="secondary"><br />  Brand Color :   </SmallText>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                <SmallText type="secondary">
                  {moment(props.getRequestData.getAssetRequest.deliveryDate).format("YYYY-MM-DD")}
                </SmallText>
              </Col>
              {props && props.getRequestData && props.getRequestData.getAssetRequest && props.getRequestData.getAssetRequest.brandColor && props.getRequestData.getAssetRequest.brandColor.map((color, index) => {
                return (
                  <Col span={3} key={index}>
                    <InputText type="color" disabled style={{ borderRadius: "50px", width: "40px" }} value={color && color.colorCode ? color.colorCode : "Not Found"} />

                    {color && color.colorCode ?
                      <SmallText type="secondary">
                        {color.colorCode}
                      </SmallText>
                      :
                      <SmallText type="secondary">
                        Not Found
                      </SmallText>
                    }
                  </Col>
                );
              })}
            </Row>

            <Row>
              <br />
              <Col span={4}>
                <SmallText type="secondary"> <br /> Files : </SmallText>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Upload
                  key={props.match.params.id}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}>
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <br />
              </Col>
            </Row>

            <Row>
              <br />
              <Col span={8}>
                <SmallText type="secondary"> Status </SmallText>
                {props && props.getRequestData && props.getRequestData.getAssetRequest && props.getRequestData.getAssetRequest.assets && props.getRequestData.getAssetRequest.assets.map((assetStatus) => {
                  if (assetStatus.status === "WAITING") {
                    return (<Tag key={uuidv4()} color="geekblue">{assetStatus.status}</Tag>)
                  }
                  else if (assetStatus.status === "PENDING") {
                    return (<Tag key={uuidv4()} color="gold">{assetStatus.status}</Tag>)
                  }
                  else if (assetStatus.status === "APPROVE") {
                    return (<Tag key={uuidv4()} color="magenta">{assetStatus.status}</Tag>)
                  }
                  else if (assetStatus.status === "REJECT") {
                    return (<Tag key={uuidv4()} color="lime">{assetStatus.status}</Tag>)
                  }
                })}
              </Col>
            </Row>
          </Card.Grid>
        </Card>
      </RootDiv>
    </Form>
  );
};

export default withRouter(GetRequestDetail);
