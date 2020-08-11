import styled, { css } from 'styled-components';
import { Row, Col, Form, Input, Button, Typography } from 'antd';
const { Text } = Typography;

export const FontSize = css`
font-size : 10px;
`
export const ImgCss = css`
    filter: brightness(50%);
`;

export const TextOnImage = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const HeadContainer = styled.div`
    height :70%;
    /* width : 80%; */
    /* padding-left : 18%; */
    font-family: 'Poppins', sans-serif;
`;

export const AntRow = styled(Row)`
    padding : 5em 0em;
    height: auto;
    display: flex;
    justify-content: center;
`;

export const AntColImage = styled(Col)` 
    background : white;
    width: 30%;
    -webkit-box-shadow: 3px 3px 5px 6px #f2f2f2;  //#f2f2f2  
    -moz-box-shadow:    3px 3px 5px 6px #ccc;  //#ccc 
    box-shadow:         3px 3px 5px 6px #f2f2f2; 
`;

export const AntColForm = styled(AntColImage)`
    width: 29%;
`;

export const AntForm = styled(Form)`
    padding : 15% 5%;
    display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: baseline;
`;

export const AntFormTitle = styled.h2`
    color : black;
    text-align : left;
    margin-bottom : 6%;
    font-family: 'Poppins', sans-serif;
`;

export const AntInputLabel = styled.label`
    &.ant-form label {
        font-size: 10px;
    }
`;

export const AntLinkLabel = styled(Text)`
    padding-left: 20%;
    font-family: 'Poppins', sans-serif;
`;



export const AntInputText = styled(Input)`
    display: block;
    font-size: 13px;
    line-height: 2;
    padding: 3% 0%;
    padding-left: 5%;
    padding-right: 5%;
    width: 350px;
    font-family: 'Poppins', sans-serif;
`;

export const AntInputPassword = styled(Input.Password)`
    display: flex;
    font-size: 13px;
    line-height: 2;
    padding: 3% 0%;
    padding-left: 5%;
    padding-right: 5%;
    width: 350px;
    font-family: 'Poppins', sans-serif;
`;


export const LinkButton = styled.a`
    text-decoration : none;
    ${FontSize}
`;

export const AntButton = styled(Button)`
    width :50%;
    border-radius : 0%;
    font-family: 'Poppins', sans-serif;
    margin-top : 5%;
    margin-left : 25%;
    &.ant-btn {
        height : 38px;
    }
`;

