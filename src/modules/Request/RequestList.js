import React from "react";
import client from "../../Apollo";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import HeaderPage from "../Header/HeaderPage";
import { WrapperDiv, CreateButton, TableRow, setToastNotification, Profile, Li } from "../Request/Css/RequestStyled";
import { MainDiv } from "../Header/HeaderStyled";
import "../auth/CSS/Login.css";
import { Table, Divider, PageHeader, Avatar, Modal, Tag } from "antd";
import { EditTwoTone, DeleteTwoTone, ExclamationCircleOutlined, ReadFilled } from '@ant-design/icons';
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { GET_ALL_ASSETS_REQUEST } from "../Request/GraphQL/Queries";
import { DELETE_ASSETS_REQUEST } from "../Request/GraphQL/Mutations";
import { GET_CURRENT_USER } from '../auth/GraphQL/Queries';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { get } from 'lodash';
const { confirm } = Modal;

const RequestList = props => {
  const { loading, error, data } = useQuery(GET_ALL_ASSETS_REQUEST, { fetchPolicy: "network-only", });
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_CURRENT_USER, { fetchPolicy: "network-only", });
  const { loading: currentLoading, error: currentError, data: currentData } = useQuery(GET_CURRENT_USER, { fetchPolicy: "network-only" });


  if (loading) return <SpinnerLoader key={uuidv4()} />
  if (error) return <p>{error.message}</p>;

  if (userLoading) return ""
  if (userError) return "";

  if (currentLoading) return ""
  if (currentError) return "";

  const deleteAssetsRequest = (id) => {
    confirm({
      className: 'FontFamily',
      title: 'Are you sure delete this record?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        client.mutate({
          mutation: DELETE_ASSETS_REQUEST,
          variables: { id: id },

          refetchQueries: [
            {
              query: GET_ALL_ASSETS_REQUEST,
              fetchPolicy: "network-only",
            },
          ],
        })
          .then(() => {
            setToastNotification("success", "Record", "Record delete successfully.");
            props.history.push("/request-list");
          })
          .catch(error => {
            setToastNotification("error", "Record", `${error}`);
            props.history.push("/request-list");
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Last Update On",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
    },
    {
      title: "Due date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Share With",
      key: "shareWith",
      dataIndex: "shareWith",
    },
    {
      title: "Progress",
      key: "progress",
      dataIndex: "progress",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <span>
            {record.userId === userData.currentUser.id || userData.currentUser.role === "ADMIN" ?
              <div key={index}>
                <EditTwoTone onClick={() => { props.history.push(`/request-list/${record.id}/edit`) }} />
                <Divider type="vertical" />
                <DeleteTwoTone onClick={() => deleteAssetsRequest(record.id)} style={{ padding: "0px 10px" }} />
              </div>
              :
              <div key={index}>
                <ReadFilled onClick={() => props.history.push(`/request-list/${record.id}`)} />
              </div>
            }
          </span>
        )
      },
    },
  ];

  const listData = get(data, 'getAssetRequests').map((getAssetRequest, key) => {
    return {
      key: key,
      id: getAssetRequest.id,
      userId: getAssetRequest.user.id,
      title: (
        <CreateButton type="link"
          onClick={() =>
            props.history.push(`/request-list/${getAssetRequest.id}`)} >
          {getAssetRequest.title}
        </CreateButton>
      ),
      lastUpdate: moment(getAssetRequest.updatedAt).format("YYYY-MM-DD"),
      dueDate: moment(getAssetRequest.deliveryDate).format("YYYY-MM-DD"),
      shareWith: <Profile>{
        get(getAssetRequest, 'shareWith').map((image, index) => {
          while (index < 10) {
            return <Li key={uuidv4()}>
              {
                image.profileImage ? (<Avatar src={image.profileImage} />) : (<Avatar style={{ backgroundColor: " #9fff80" }}>{image.email.charAt(0).toUpperCase()}</Avatar>)
              }
            </Li>
          }
          return null
        })}</Profile>,

      progress: get(getAssetRequest, 'assets').map((asset, key) => {
        if (asset.status === "WAITING") {
          return (
            <Tag color="geekblue" key={uuidv4()}>{asset.status}</Tag>
          )
        }
        else if (asset.status === "PENDING") {
          return (
            <Tag color="gold" key={uuidv4()}>{asset.status}</Tag>
          )
        }
        else if (asset.status === "APPROVED") {
          return (
            <Tag color="magenta" key={uuidv4()}>{asset.status}</Tag>
          )
        }
        else {
          return (
            <Tag color="lime" key={uuidv4()}>{asset.status}</Tag>
          )
        }

      })

    };
  });

  return (
    <div>
      <HeaderPage />
      <WrapperDiv>
        <MainDiv>
          <PageHeader title="Creative Requests" />
          {currentData.currentUser.role === "ADMIN" ? "" :
            <PageHeader extra={[
              <CreateButton key={uuidv4()} type="primary" onClick={() => { props.history.push("/request-list/create"); }} >
                Add Creative Request
              </CreateButton>]} />
          }
        </MainDiv>
        <hr />
        <TableRow>
          <Table columns={columns} scroll={{ y: 400 }} dataSource={listData} pagination={false} />
        </TableRow>
      </WrapperDiv>
    </div>
  );
};

export default withRouter(RequestList);
