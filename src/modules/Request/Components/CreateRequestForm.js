import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import { Select, Form, Upload, Row, Col } from 'antd';
import { UploadOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { LinkButton } from '../../auth/CSS/LoginStyled';
import { WrapperDiv, CreateButton } from '../../Request/Css/RequestStyled';
import { ContentDiv, InputText, InputLabel, ContentCol, ContentRow, FileContent, InputTextArea, InputDate } from '../../Request/Css/CreateRequestStyled';
import { GET_ALL_USERS } from '../../Request/GraphQL/Queries';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';
import moment from 'moment';
const { Option } = Select;

const CreateRequestForm = ({ form }) => {

    const { loading, error, data } = useQuery(GET_ALL_USERS, { fetchPolicy: "network-only" });

    const handleColorChange = (e, name) => {
        const color = e.color;
        form.setFieldsValue({ fieldName: color })
    }

    const disabledDate=(current)=> {
        console.log("today",current);
        // Can not select days before today and today
        return current && current < moment().endOf('day') ;
      }

    const props2 = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        listType: 'picture',
        className: 'upload-list-inline',

    };

    if (loading) return "";
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            <WrapperDiv>
                <ContentRow>
                    <ContentCol span={5}><InputLabel>Request Description</InputLabel></ContentCol>
                    <ContentCol span={15}>
                        <ContentDiv>
                            <InputLabel> Request  Title</InputLabel>
                            <InputLabel> Delivery Date</InputLabel>
                        </ContentDiv>

                        <ContentDiv>
                            <Form.Item
                                name="title"
                                rules={[{
                                    required: true,
                                    message: 'Please enter title..!'
                                }]} >
                                <InputText style={{ width: "350px" }} maxLength={15} placeholder="Request Title" />
                            </Form.Item>

                            <Form.Item name="deliveryDate" >
                                <InputDate disabledDate={disabledDate} style={{ width: "350px" }} />
                            </Form.Item>
                        </ContentDiv>

                        <InputLabel>Description</InputLabel>
                        <Form.Item
                            name="description"
                            rules={[{
                                required: true,
                                message: 'Please enter description..!'
                            }]}>
                            <InputTextArea rows={2} maxLength={200} placeholder="Description" />
                        </Form.Item>
                    </ContentCol>
                </ContentRow>

                <ContentRow>
                    <ContentCol span={5}><InputLabel>Brand Guideline</InputLabel></ContentCol>
                    <ContentCol span={15}>
                        <Form.List name="brandColor">
                            {(fields, { add, remove }) => {
                                return (
                                    <div>
                                        {fields.map((field, index) => (
                                            <Row key={field.key}>
                                                <Col>
                                                    <Form.Item name={[field.name, "colorCode"]} fieldKey={[field.fieldKey, "colorCode"]}>
                                                        <ColorPicker onChange={(e) => handleColorChange(e, field.name)} />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item name={[field.name, "labelName"]} fieldKey={[field.fieldKey, "labelName"]} >
                                                        <InputText placeholder="labelName" />
                                                    </Form.Item>
                                                </Col>
                                                <Col flex="none">
                                                    <MinusCircleOutlined className="dynamic-delete-button" onClick={() => { remove(field.name); }} />
                                                </Col>
                                            </Row>
                                        ))}
                                        <Form.Item>
                                            <LinkButton type="link" onClick={() => { add(); }} > Add field </LinkButton>
                                        </Form.Item>
                                    </div>
                                );
                            }}
                        </Form.List>

                        <FileContent>
                            <Form.Item name="fileUrls" valuePropName={''}>
                                <Upload {...props2}>
                                    <Row type="flex">
                                        <Col span={6}>
                                            <CreateButton>  <UploadOutlined />  Browse </CreateButton>
                                        </Col>
                                    </Row>
                                </Upload>
                            </Form.Item>
                        </FileContent>
                    </ContentCol>
                </ContentRow><br />

                <ContentRow>
                    <ContentCol span={5}><InputLabel>Share With People</InputLabel></ContentCol>
                    <ContentCol span={15}>
                        <InputLabel>Add Brand Files</InputLabel>
                        <Form.Item name="shareWith" rules={[{ required: true, message: 'Please select users..!' }]}>
                            <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} >
                                {data && data.getUsers && data.getUsers.length > 0 && data.getUsers.map((user, key) => {
                                    return (
                                        <Option key={user.email}>{user.email}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </ContentCol>
                </ContentRow>
            </WrapperDiv>
        </div>
    )
}

export default withRouter(CreateRequestForm);