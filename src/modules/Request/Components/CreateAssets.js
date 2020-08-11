import React from "react";
import { CreateButton } from "../Css/RequestStyled";
import { Form, Row, Upload, Card, Col, Select, Button } from "antd";
import { UploadOutlined, MinusCircleOutlined, DeleteTwoTone } from '@ant-design/icons';
import { MainDiv, ContentCol, AssetsInput, CheckBoxValue, } from "../Css/CreateAssetsStyled";
import { InputText, InputLabel, InputTextArea, FileContent } from "../Css/CreateRequestStyled";
import { v4 as uuidv4 } from 'uuid';
const { Option } = Select;

const CreateAssets = props => {

  const rules = [{ required: true }];
  const fileExtentions = [
    { name: "png", value: "png" },
    { name: "jpg", value: "jpg" },
    { name: "jpeg", value: "jpeg" },
    { name: "pdf", value: "pdf" },
  ];

  const props2 = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture',
    className: 'upload-list-inline',

  };


  const gridStyle = {
    width: "100%",
    textAlign: "left",
  };

  return (
    <MainDiv>
      <Row type="flex" style={{ justifyContent: "flex-end" }}>
        <Col><CreateButton type="link" htmlType="submit" onClick={props.assetTemplate}>Save as Template</CreateButton></Col>
      </Row>
      <Form.List name="assets">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Card key={field.key}>
                  <Card.Grid style={gridStyle}>
                    <Row type="flex" style={{ justifyContent: "space-between" }}>
                      <Col><InputLabel>{`Assets ${field.key + 1}`}</InputLabel></Col>
                      <Col> <DeleteTwoTone onClick={() => { remove(field.name); }} /> </Col>
                    </Row><br />
                    <InputLabel>Request Title</InputLabel>
                    <Form.Item
                      name={[field.name, "title"]}
                      rules={rules}>
                      <InputText maxLength={15} placeholder="Request Title" />
                    </Form.Item>

                    <InputLabel>Description</InputLabel>
                    <Form.Item
                      name={[field.name, "description"]}
                      rules={rules} >
                      <InputTextArea rows={2} maxLength={200} placeholder="Description" />
                    </Form.Item>

                    <Row type="flex" justify="flex-start">
                      <InputLabel>Add Primary Assets Details</InputLabel>
                    </Row>

                    <Row type="flex" gutter={[0, 10]} justify="space-around">
                      <ContentCol span={4}>File Formate</ContentCol>
                      <ContentCol span={4}>Max File Size</ContentCol>
                      <ContentCol span={4}>Width</ContentCol>
                      <ContentCol span={4}>Height</ContentCol>
                      <ContentCol span={4}>Transparent BG</ContentCol>
                    </Row>

                    <Row type="flex" justify="space-around">
                      <ContentCol span={4}>
                        <Form.Item name={[field.name, "extensions"]} rules={[{ required: true, message: 'Please file extention!', },]} >
                          <Select style={{ width: 120 }} placeholder="Please select a country">
                            {fileExtentions && fileExtentions.map((ext) => {
                              return (
                                <Option key={uuidv4()} value={ext.value}>{ext.value}</Option>
                              )
                            })}
                          </Select>
                        </Form.Item>
                      </ContentCol>
                      <ContentCol span={4}>
                        <Form.Item
                          name={[field.name, "maxFileSize"]}
                          rules={[
                            {
                              required: true,
                              message: 'Please enter max size..!',
                            },
                          ]} >
                          <AssetsInput maxLength={5} suffix="MB" />
                        </Form.Item>
                      </ContentCol>
                      <ContentCol span={4}>
                        <Form.Item
                          name={[field.name, "width"]}
                          rules={[
                            {
                              required: true,
                              message: 'Please enter width..!',
                            },
                          ]}>
                          <AssetsInput maxLength={5} suffix="PX" />
                        </Form.Item>
                      </ContentCol>
                      <ContentCol span={4}>
                        <Form.Item
                          name={[field.name, "height"]}
                          rules={[
                            {
                              required: true,
                              message: 'Please enter height..!',
                            },
                          ]}>
                          <AssetsInput maxLength={5} suffix="PX" />
                        </Form.Item>
                      </ContentCol>
                      <ContentCol span={4}>
                        <Form.Item valuePropName="checked" name={[field.name, "transparentBg"]}>
                          <CheckBoxValue />
                        </Form.Item>
                      </ContentCol>
                    </Row>

                    <Row type="flex" justify="flex-start">
                      <InputLabel>Add Derivative Details</InputLabel>
                    </Row>

                    <Row type="flex" gutter={[0, 10]} justify="space-around">
                      <ContentCol span={4}>File Formate</ContentCol>
                      <ContentCol span={4}>Max File Size</ContentCol>
                      <ContentCol span={4}>Width</ContentCol>
                      <ContentCol span={4}>Height</ContentCol>
                      <ContentCol span={4}></ContentCol>
                    </Row>

                    <Form.List name={[index, "derivativeDetails"]}>
                      {(fields, { add, remove }) => {
                        return (
                          <div>
                            {fields.map((field) => (
                              <Row key={field.name} gutter={[10, 10]}>
                                <ContentCol span={5}>
                                  <Form.Item name={[field.name, "extensions"]} rules={[{ required: true, message: 'Please file extention!', },]} >
                                    <Select style={{ width: 120 }} placeholder="Please select a country">
                                      {fileExtentions && fileExtentions.map((ext) => {
                                        return (
                                          <Option key={uuidv4()} value={ext.value}>{ext.value}</Option>
                                        )
                                      })}
                                    </Select>
                                  </Form.Item>
                                </ContentCol>
                                <ContentCol span={5}>
                                  <Form.Item name={[field.name, "maxFileSize"]} rules={[{ required: true, message: 'Please enter max size..!', },]}>
                                    <AssetsInput maxLength={5} suffix="MB" />
                                  </Form.Item>
                                </ContentCol>
                                <ContentCol span={5}>
                                  <Form.Item name={[field.name, "width"]} rules={[{ required: true, message: 'Please enter width..!', },]}>
                                    <AssetsInput maxLength={5} suffix="PX" />
                                  </Form.Item>
                                </ContentCol>
                                <ContentCol span={5}>
                                  <Form.Item name={[field.name, "height"]} rules={[{ required: true, message: 'Please enter height..!', },]}>
                                    <AssetsInput maxLength={5} suffix="PX" />
                                  </Form.Item>
                                </ContentCol>
                                <ContentCol span={5} flex="none">
                                  <MinusCircleOutlined className="dynamic-delete-button" onClick={() => { remove(field.name); }} />
                                </ContentCol>
                              </Row>
                            ))}
                            <ContentCol span={5} flex="none">
                              <Form.Item>
                                <Button type="primary" onClick={() => { add(); }} > Add </Button>
                              </Form.Item>
                            </ContentCol>
                          </div>
                        );
                      }}
                    </Form.List>

                    <Row type="flex" gutter={[0, 14]} justify="flex-start">
                      <InputLabel>Add assets specific files for references</InputLabel>
                    </Row>

                    <FileContent>
                      <Form.Item name={[field.name, "fileUrls"]} valuePropName={''}>
                        <Upload {...props2}>
                          <Row type="flex">
                            <Col span={6}>
                              <CreateButton>  <UploadOutlined />  Browse </CreateButton>
                            </Col>
                          </Row>
                        </Upload>
                      </Form.Item>
                    </FileContent>
                  </Card.Grid>
                </Card>
              ))}
              <Form.Item>
                <br />
                <CreateButton type="primary" onClick={() => { add(); }}  >
                  Add Assets
                </CreateButton>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </MainDiv >
  );
};

export default CreateAssets;
