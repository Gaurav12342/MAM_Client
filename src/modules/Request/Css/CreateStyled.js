import styled from 'styled-components';
import { Upload } from 'antd';

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

export const ImageUpload = styled(Upload)`
  &.upload-list-inline .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}

  &.upload-list-inline [class*='-upload-list-rtl'] .ant-upload-list-item {
  float: right;
}
  &.upload-list-inline .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
  &.upload-list-inline .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
}
`;


