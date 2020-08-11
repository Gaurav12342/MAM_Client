import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CreateButton } from "../Request/Css/RequestStyled";
import { withRouter } from 'react-router-dom';
import HeaderPage from '../Header/HeaderPage';
import GetAssetDetail from './Components/GetAssetDetail';
import GetRequestDetail from '../Request/Components/GetRequestDetail';
import '../auth/CSS/Login.css';
import { RootDiv } from "../Request/Css/GetDetailStyled";
import { GET_SPECIFIC_ASSETS_REQUEST } from "../Request/GraphQL/Queries";

const GetSpecificRequest = (props) => {

  const { match: { params: { id: assetRequestId }, }, } = props;
  const { loading, error, data } = useQuery(GET_SPECIFIC_ASSETS_REQUEST, { variables: { assetRequestId }, fetchPolicy: "network-only", });

  if (loading) return "";
  if (error) return "";

  return (
    <div className="FontFamily">
      <HeaderPage />
      <GetRequestDetail getRequestData={data} />
      <GetAssetDetail getAssetData={data} />
      <RootDiv>
        <CreateButton type="primary" htmlType="submit" onClick={() => { props.history.push("/request-list/create") }}> Add Assets</CreateButton>
      </RootDiv>
    </div>
  )
}

export default withRouter(GetSpecificRequest);