import styled from 'styled-components';
import { Row, Col, Input,Checkbox } from 'antd';

export const MainDiv = styled.div`
    padding : 1% 10%;
    width : 0% auto;
    font-family: 'Poppins', sans-serif;
`;

export const ContentRow = styled(Row)`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
`;

export const ContentCol = styled(Col)`

`;

export const AssetsInput = styled(Input)`
width : 120px;
`;

export const CheckBoxValue = styled(Checkbox)`
    & > span > .ant-checkbox-inner {
        height : 30px;
        width : 30px;
    }
`;
