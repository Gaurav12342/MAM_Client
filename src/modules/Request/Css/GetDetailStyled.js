import styled from "styled-components";
import { Typography, Row } from "antd";
const { Text } = Typography;

export const RootDiv = styled.div`
  padding: 1% 5%;
  height: 0% auto;
`;

export const SmallText = styled(Text)``;


export const AssetFilesRow = styled(Row)`
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-around;
	align-items: baseline;
	align-content: stretch;
`;

