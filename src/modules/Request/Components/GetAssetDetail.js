import React, { useState } from "react";
import client from '../../../Apollo';
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { message, Form, Card, Row, Col, Typography, Upload, Tag, Modal } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { MainDiv } from "../../Request/Css/CreateAssetsStyled";
import { SmallText } from "../../Request/Css/GetDetailStyled";
import { CREATE_ASSETS_DOCUMENTS } from "../../Request/GraphQL/Mutations";
import { GET_SPECIFIC_ASSET_DOCUMENT } from "../../Request/GraphQL/Queries";
import { GET_CURRENT_USER } from '../../auth/GraphQL/Queries';
import { v4 as uuidv4 } from 'uuid';
const { Title } = Typography;


const GetAssetDetail = props => {
  const { loading: currentLoading, error: currentError, data: currentData } = useQuery(GET_CURRENT_USER, { fetchPolicy: "network-only" });
  const { loading: documentLoading, error: documentError, data: documentData } = useQuery(GET_SPECIFIC_ASSET_DOCUMENT, { variables: { assetRequestId: props.getAssetData && props.getAssetData.getAssetRequest.id, assetId: props.getAssetData && props.getAssetData.getAssetRequest.assets[0].id, assetLabel: "PRIMARY" }, fetchPolicy: "network-only" });


  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  if (currentLoading) return "";
  if (currentError) return "";

  if (documentLoading) return "";
  if (documentError) return "";

  const assetFileList = props && props.getAssetData && props.getAssetData.getAssetRequest && props.getAssetData.getAssetRequest.assets[0].fileUrls && props.getAssetData.getAssetRequest.assets[0].fileUrls.map((image, key) => {
    return {
      uid: key,
      name: image.split("\\").pop().split("/").pop(),
      url: image,
    };
  });

  const derivativeImage = documentData && documentData.getAssetDocuments && documentData.getAssetDocuments.length > 0 && documentData.getAssetDocuments.map((file, key) => {
    return {
      uid: key,
      name: file.fileUrl,
      url: file.fileUrl,
    };
  });

  const gridStyle = {
    width: "100%",
    textAlign: "left",
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
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

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/pdf';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG/JPEG/PDF file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Document must be upload less than 2 MB');
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const derivativeDoc = {
    name: 'file',
    listType: "picture-card",
    showUploadList: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info, error) {
      if (info.file.status !== 'uploading') {
        const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png' || info.file.type === 'image/jpg' || info.file.type === 'image/pdf';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = info.file.size / 1024 > 6;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        if (!error) {
          const fileDoc = info && info.fileList[0].originFileObj;
          client.mutate({
            mutation: CREATE_ASSETS_DOCUMENTS,
            variables: {
              fileUrl: fileDoc,
              assetRequestId: props.getAssetData.getAssetRequest.id,
              assetId: props.getAssetData.getAssetRequest.assets[0].id,
              userId: currentData.currentUser.id,
            },
            refetchQueries: [{
              query: GET_SPECIFIC_ASSET_DOCUMENT,
              fetchPolicy: "network-only"
            }]
          })
            .then(() => {
              message.success(`Upload document Successfully.`);
            })
            .catch(error => {
              message.error(`${error}`);
            });
        }
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl =>
          setImageUrl(imageUrl),
          setLoading(false)
        );
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };



  return (
    <MainDiv>
      <Card>
        {props.getAssetData && props.getAssetData.getAssetRequest && props.getAssetData.getAssetRequest.assets && props.getAssetData.getAssetRequest.assets.map(asset => {
          return (
            <Card.Grid key={uuidv4()} style={gridStyle}>
              <Row>
                <Col span={19}>
                  <Title level={4}> {asset.title} </Title>
                </Col>
                <Col span={4}>
                  {asset.status === "PENDING" ? (
                    <Tag color="gold">{asset.status}</Tag>
                  ) : (
                      <Tag color="geekblue">{asset.status}</Tag>
                    )}
                </Col>
              </Row>

              <Row>
                <Col>Description : </Col>
              </Row>

              <Row>
                <Col>
                  <SmallText type="secondary">{asset.description}</SmallText>
                </Col>
              </Row> <br />

              <Row>
                <Col>Asset Specific Files for References</Col>
              </Row>

              <Row>
                <Col>
                  <Upload
                    key={asset.id}
                    listType="picture-card"
                    fileList={assetFileList}
                    defaultFileList={assetFileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  />
                  <br />
                </Col>
              </Row>

              <Row>
                <Col>Primary Asset Details</Col>
              </Row>

              <Row type="flex" justify="start">
                <Col span={6} >
                  <Form>
                    {currentData.currentUser.role === "ADMIN" ?
                      <div>
                        <Form.Item name="fileUrl" valuePropName={''}>
                          <Upload beforeUpload={beforeUpload} {...derivativeDoc}>
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                          </Upload>,
                        </Form.Item>
                      </div>
                      :
                      <Row>
                        <Col span={12}>
                          <Upload
                            listType="picture-card"
                            fileList={derivativeImage}
                            onPreview={handlePreview}
                            onChange={handleChange}>
                          </Upload>
                          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                          </Modal>
                          <br />
                        </Col>
                      </Row>
                    }
                  </Form>
                </Col>


                <Col span={4}>
                  Dimensions <br />
                  <SmallText>{asset.height} </SmallText> *
                    <SmallText>{asset.width} </SmallText> <br /> <br />
                      Max File Size <br />
                  <SmallText>{asset.maxFileSize} </SmallText> <br />
                </Col>
                <Col span={4}>
                  Upload file formate <br />
                  <SmallText>
                    {!asset.extensions ? "Not Found" : asset.extensions}
                  </SmallText>
                  <br /> <br />
                      Transparent BG <br />
                  <SmallText>
                    {asset.transparentBg ? "True" : "False"}
                  </SmallText>
                  <br />
                </Col>
              </Row>

              <Row>
                <Col>Derivative Asset Details</Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Upload
                    listType="picture-card"
                    fileList={derivativeImage}
                    onPreview={handlePreview}
                    onChange={handleChange}>
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                  <br />
                </Col>
              </Row>
            </Card.Grid>
          );
        })}
      </Card> <br />
    </MainDiv>
  );
};

export default withRouter(GetAssetDetail);
