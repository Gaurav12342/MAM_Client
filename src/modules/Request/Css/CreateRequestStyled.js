import styled from 'styled-components';
import { Input, Typography, DatePicker, Row, Col,Upload } from 'antd';
const { Text } = Typography;

export const ContentDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: space-between;
align-items: baseline;
align-content: center;

`;

export const LabelDiv = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	align-content: center;
`;

export const ColorDiv = styled.div`
display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: baseline;
	align-content: center;
`;

export const ContentRow = styled(Row)`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	align-content: stretch;

`;

export const AssetsTitleRow = styled(ContentRow)`
	justify-content: space-between;
	align-items: flex-start;
`;
export const AssetsForm = styled.div`
	display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
`;

export const ContentCol = styled(Col)`

`;

export const FileContent = styled.div`
    display: flex;
	flex-direction: column-reverse;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-start;
	align-content: stretch;
`;

export const InputText = styled(Input)`
	 
`;

export const InputTextArea = styled(Input.TextArea)`

`;

export const InputDate = styled(DatePicker)`
/* .ant-calendar-input {
      display: none;
    } */

    /* &.ant-calendar-footer {
      display: none;
    } */

		/* .class:"ant-picker-footer" */
`;

export const InputLabel = styled(Text)`
	align-items : left;
`;

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

