import React from "react";
import client from "../../Apollo";
import { withRouter } from "react-router-dom";
import HeaderPage from "../Header/HeaderPage";
import { useQuery } from "@apollo/react-hooks";
import { setToastNotification, WrapperDiv, CreateButton } from "../Request/Css/RequestStyled";
import { MainDiv } from "../Header/HeaderStyled";
import { Form, PageHeader, Row } from "antd";
import CreateAssets from "./Components/CreateAssets";
import CreateRequestForm from "../Request/Components/CreateRequestForm";
import { CREATE_ASSETS_REQUEST, CREATE_ASSETS_TEMPLATE } from "../Request/GraphQL/Mutations";
import { GET_ALL_ASSETS_REQUEST } from "../Request/GraphQL/Queries";
import { GET_CURRENT_USER } from '../auth/GraphQL/Queries';

const CreateRequest = props => {

  const { loading, error, data } = useQuery(GET_CURRENT_USER, { fetchPolicy: "network-only" });

  const [form] = Form.useForm()
  if (loading) return "";
  if (error) return "";

  const submitData = (values, error) => {
    if (!error) {
      const colors = values.brandColor.map((color) => {
        return ({
          colorCode: color.colorCode.color,
          labelName: color.labelName,
        })
      })

      const requestFile = values && values.fileUrls && values.fileUrls.fileList.map((file) => { return (file.originFileObj) });
      values.fileUrls = requestFile;

      const assetDetail = values && values.assets && values.assets.map((asset) => {
        return ({
          title: asset.title,
          description: asset.description,
          extensions: asset.extensions,
          maxFileSize: parseFloat(asset.maxFileSize),
          height: parseFloat(asset.height),
          width: parseFloat(asset.width),
          transparentBg: asset.transparentBg,
          fileUrls: asset && asset.fileUrls && asset.fileUrls.fileList && asset.fileUrls.fileList.map((aa) => { return (aa.originFileObj) }),
          derivativeDetails: asset && asset.derivativeDetails && asset.derivativeDetails.map((derivate) => {
            return ({
              extensions: derivate.extensions,
              height: parseFloat(derivate.height),
              maxFileSize: parseFloat(derivate.maxFileSize),
              width: parseFloat(derivate.width)
            })
          })
        })
      })
      values.assets = assetDetail;

      client.mutate({
        mutation: CREATE_ASSETS_REQUEST,
        variables: {
          title: values.title,
          description: values.description,
          deliveryDate: values.deliveryDate,
          fileUrls: values.fileUrls,
          shareWith: values.shareWith,
          brandColor: colors,
          assets: values.assets
        },

        refetchQueries: [{
          query: GET_ALL_ASSETS_REQUEST,
          fetchPolicy: "network-only"
        }]
      })
        .then(() => {
          setToastNotification('success', 'Record', 'Record insert Successfully.');
          props.history.push("/request-list");
        })
        .catch((error) => {
          setToastNotification('error', 'Record', `${error}`);
        })
    }
  }

  const submitAssetTemplate = (error) => {
    const values = form.getFieldsValue(['assets'])
    if (!error) {
      const assetDetail = values && values.assets && values.assets.map((asset) => {
        return ({
          title: asset.title,
          description: asset.description,
          extensions: asset.extensions,
          maxFileSize: parseFloat(asset.maxFileSize),
          height: parseFloat(asset.height),
          width: parseFloat(asset.width),
          transparentBg: asset.transparentBg,
          fileUrls: asset && asset.fileUrls && asset.fileUrls.fileList && asset.fileUrls.fileList.map((aa) => { return (aa.originFileObj) }),
          derivativeDetails: asset && asset.derivativeDetails && asset.derivativeDetails.map((derivate) => {
            return ({
              extensions: derivate.extensions,
              height: parseFloat(derivate.height),
              maxFileSize: parseFloat(derivate.maxFileSize),
              width: parseFloat(derivate.width)
            })
          })
        })
      })
      values.assets = assetDetail;

      client.mutate({
        mutation: CREATE_ASSETS_TEMPLATE,
        variables: {
          userId: data.currentUser.id,
          assets: values.assets
        }
      })
        .then(() => {
          setToastNotification('success', 'Template', 'Save as Template.');
        })
        .catch(error => {
          setToastNotification('error', 'Template', `${error}`);
        });
    }
  }


  return (
    <div>
      <Form onFinish={submitData} initialValues={{ assets: [{ derivativeDetails: [{}] }], brandColor: [{ 'labelName': 'primary', 'colorCode': '#00ff2e' }, { 'labelName': 'secondary', 'colorCode': '#531dab' }] }} form={form}>
        <HeaderPage />
        <WrapperDiv>
          <MainDiv>
            <PageHeader onBack={() => props.history.push("/request-list")} title="Add Creative Request" />
          </MainDiv> <hr /> <br />
          <CreateRequestForm form={form} />
        </WrapperDiv>

        <WrapperDiv>
          <CreateAssets assetTemplate={submitAssetTemplate} />
        </WrapperDiv>

        <WrapperDiv>
          <Row type="flex" justify="end">
            <CreateButton type="primary" style={{ width: "10%", height: "50px" }} onClick={() => { props.history.push("/request-list"); }} >
              Cancel
          </CreateButton> &nbsp;
         <CreateButton type="primary" htmlType="submit" style={{ width: "20%", height: "50px" }} >
              Add Creative Request
          </CreateButton>
          </Row>
        </WrapperDiv>
      </Form >
    </div>
  );
};

export default withRouter(CreateRequest);
