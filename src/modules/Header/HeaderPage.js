import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../auth/CSS/Login.css'
import { Menu, Button, Avatar, PageHeader, Badge, Modal } from 'antd';
import { MainDiv, DropDownValue } from '../Header/HeaderStyled';
import { GET_CURRENT_USER, COUNT_NOTIFICATION, GET_NOTIFICATION } from '../auth/GraphQL/Queries';
import { NOTIFICATION_SUBSCRIPTION, ASSET_DOCUMENT_SUBSCRIPTION } from '../auth/GraphQL/Subscription';
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { BellTwoTone } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { get } from 'lodash';
import moment from 'moment'

const HeaderPage = (props) => {

    const [visibleModal, setVisibleModal] = useState(false);
    const { loading, error, data } = useQuery(GET_CURRENT_USER, { fetchPolicy: "network-only" });
    const { loading: notificationLoading, error: notificationError, data: notificationData } = useQuery(COUNT_NOTIFICATION, { fetchPolicy: "network-only" });
    const { loading: getNotificationLoading, error: getNotificationError, data: getNotificationData } = useQuery(GET_NOTIFICATION, { fetchPolicy: "network-only" });
    const { loading: viewNotificationLoading, error: viewNotificationError, data: viewNotificationData } = useSubscription(NOTIFICATION_SUBSCRIPTION, { fetchPolicy: "network-only" });
    const { loading: documentNotificationLoading, error: documentNotificationError, data: documentNotificationData } = useSubscription(ASSET_DOCUMENT_SUBSCRIPTION, { fetchPolicy: "network-only" });

    useEffect(() => { }, [viewNotificationData])
    useEffect(() => { }, [documentNotificationData])


    if (loading) return <p></p>;
    if (error) return <p></p>

    if (notificationLoading) return "";
    if (notificationError) return "";


    if (viewNotificationLoading) return "";
    if (viewNotificationError) return "";

    if (getNotificationLoading) return "";
    if (getNotificationError) return "";

    if (documentNotificationLoading) return "";
    if (documentNotificationError) return "";

    const removeSession = () => {
        localStorage.removeItem("access_token");
    }

    const showModal = () => {
        setVisibleModal(true);
    };

    const handleCancel = () => {
        setVisibleModal(false);
    }


    const menu = (
        <Menu>
            <Menu.Item>
                <Link className="FontFamily" to="/change-password"> Change Password</Link>
            </Menu.Item>
            <Menu.Item>
                <Link className="FontFamily" to={`/manage-profile/${data.currentUser.id}`}>Manage profile </Link>
            </Menu.Item>
            <Menu.Item>
                <Link className="FontFamily" onClick={removeSession} to="/">Logout</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <MainDiv>
                <PageHeader className="FontFamily" title="Logo"/>
                <PageHeader className="FontFamily" extra={[
                    <Badge key={1} onClick={showModal} count={notificationData.countNotifications}><BellTwoTone /> {' '} </Badge>,
                    <Modal title="Notifications"
                        key={uuidv4()}
                        onCancel={handleCancel}
                        okButtonProps={{ style: { display: 'none' } }}
                        visible={visibleModal}>
                        {get(getNotificationData, 'getNotifications').map((notification, index) => {
                            return (
                                <div key={index}>
                                    <Button type="link">{notification.title} {moment(notification.createdAt).format("YYYY-MM-DD")}</Button>
                                </div>
                            )
                        })}
                    </Modal>,
                    <DropDownValue key={2} overlay={menu}>
                        <Button className="FontFamily" style={{ border: 'none' }}>
                            {!data.currentUser.profileImage ? <Avatar style={{ backgroundColor: "#9fff80" }}> {data.currentUser.name.charAt(0).toUpperCase()} </Avatar> : <Avatar src={data.currentUser.profileImage} />}
                            {!data.currentUser.name ? data.currentUser.email : data.currentUser.name}
                        </Button>
                    </DropDownValue>
                ]} />
            </MainDiv>
    )
}

export default HeaderPage;
