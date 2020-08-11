import gql from 'graphql-tag'

export const GET_CURRENT_USER = gql`
query currentUser{ 
currentUser{
    id
    email
    profileImage
    name
    role
  }
}
`

export const GET_ALL_USERS=gql`
query getUsers{
  getUsers{
    id
    name
    email
    profileImage
    password
    role
    token
    tokenExpiration
    createdAt
    updatedAt
    deletedAt
  }
}
`;


export const COUNT_NOTIFICATION=gql`
query countNotifications{
  countNotifications
}
`;

export const GET_NOTIFICATION=gql`
query getNotifications{
  getNotifications{
    id
    title
    content
    senderId
    receiverId
    isViewed
    referenceId
    referenceData
    route
    createdAt
  }
}
`; 
