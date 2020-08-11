import React from "react";
import client from "../../Apollo";
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from "react-router-dom";
import HeaderPage from "../Header/HeaderPage";
import { WrapperDiv, CreateButton } from "../Request/Css/RequestStyled";
import { MainDiv } from "../Header/HeaderStyled";
import { Form, PageHeader, Row } from "antd";
import moment from 'moment';
import CreateAssets from "./Components/CreateAssets";
import { setToastNotification } from "../Request/Css/RequestStyled";
import CreateRequestForm from "../Request/Components/CreateRequestForm";
import { UPDATE_ASSETS_REQUEST } from "../Request/GraphQL/Mutations";
import { GET_ALL_ASSETS_REQUEST, GET_SPECIFIC_ASSETS_REQUEST } from "../Request/GraphQL/Queries";


const EditRequest = (props) => {

  const { match: { params: { id: assetRequestId } } } = props;
  const { loading, error, data } = useQuery(GET_SPECIFIC_ASSETS_REQUEST, { variables: { assetRequestId }, fetchPolicy: 'network-only' });
  const [form] = Form.useForm();

  if (loading) return "";
  if (error) return "";

  const editRequest = (values, error) => {
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
      client.mutate({
        mutation: UPDATE_ASSETS_REQUEST,
        variables: {
          id: assetRequestId,
          title: values.title,
          description: values.description,
          deliveryDate: values.deliveryDate,
          fileUrls: values.fileUrls,
          shareWith: values.shareWith,
          brandColor: colors,
          assets: assetDetail
        },

        refetchQueries: [{
          query: GET_ALL_ASSETS_REQUEST,
          fetchPolicy: "network-only"
        }]

      })
        .then(() => {
          setToastNotification('success', 'Record', 'Record update Successfully.');
          props.history.push("/request-list");
        })
        .catch(error => {
          setToastNotification('error', 'Record', `${error}`);
        });
    }
  }

  const { getAssetRequest: { title, name, description, fileUrls, shareWith: shareWithData, brandColor, assets } } = data
  const shareWith = shareWithData.map((share) => share.email)

  return (
    <div>
      <Form form={form} onFinish={editRequest} initialValues={{ title, name, description, fileUrls, shareWith, deliveryDate: moment(), brandColor, assets }}>
        <HeaderPage />
        <WrapperDiv>
          <MainDiv>
            <PageHeader onBack={() => props.history.push("/request-list")} title="Edit Request" />
          </MainDiv><hr /> <br />
          <CreateRequestForm form={form} />
        </WrapperDiv>

        <WrapperDiv>
          <CreateAssets />
        </WrapperDiv>

        <WrapperDiv>
          <Row type="flex" justify="end">
            <CreateButton type="primary" style={{ width: "10%", height: "50px" }} onClick={() => { props.history.push("/request-list"); }} >
              Cancel
            </CreateButton>{" "}
            &nbsp;
            <CreateButton type="primary" htmlType="submit" style={{ width: "20%", height: "50px" }}> Edit Request </CreateButton>
          </Row>
        </WrapperDiv>
      </Form>
    </div >
  )
}

export default withRouter(EditRequest);