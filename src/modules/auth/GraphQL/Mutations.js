import gql from "graphql-tag";

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(data: { email: $email })
  }
`;

export const RESET_PASSWORD = gql`
  mutation handleValidateResetPasswordToken( $token: String! ,$newPassword: String! ) {
    handleValidateResetPasswordToken(token: $token, newPassword: $newPassword)
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($email: String!,$name: String! ) {
    createUser(data: {email: $email,name:$name}) {
      id
      name
      email
      profileImage
      password
      role
      tokenExpiration
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($profileImage: Upload,$name: String,$id: ID!){
  updateUser(where : {id : $id} data : {profileImage: $profileImage,name: $name}){
    id
  }
}
`;

export const ADD_REGISTRATION_PASSWORD = gql`
mutation handleValidateInviteToken($token: String!,$password: String!){
  handleValidateInviteToken(token: $token,password: $password)
}
`;

export const CHANGE_PASSWORD = gql`
mutation changePassword($currentPassword: String!,$newPassword: String!){
  changePassword(data: {currentPassword: $currentPassword,newPassword: $newPassword})
}
`;
