import styled from 'styled-components';
import { Row, Button, notification } from 'antd';


export const WrapperDiv = styled.div`
    padding : 1% 2%;
    width : 0% auto;
    font-family: 'Poppins', sans-serif;
`;

export const CreateButton = styled(Button)`
    width :0% auto;
    font-family: 'Poppins', sans-serif;
`;

export const TableRow = styled(Row)`
    zoom: 1;
    width : 0% auto ;
    display: block;

`;

export const setToastNotification = (type, message, description) => {
    notification[type]({
        message,
        description
    })
}


export const Profile = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  cursor: pointer;
`

export const MemberProfile = styled.img`
  width: 28px;
`

export const Li = styled.li`
  width: 16px;
  display: inline-block;

  .ant-btn-icon-only{
    width: 30px;
    height: 30px;
  }
`

export const Labels = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  background: red;
  border-radius: 50%;
  font-style: normal;
  color: green;
`