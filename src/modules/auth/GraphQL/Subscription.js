import gql from 'graphql-tag'

export const NOTIFICATION_SUBSCRIPTION = gql`
subscription notification{
  notification{
    id
    title
    description
    deliveryDate
    fileUrls
    brandColor {
      colorCode
      labelName
    }
    shareWith {
      id
      name
    }
    assets {
      id
      title
    }
    user {
      id
      name
    }

  }
} 
`;

export const ASSET_DOCUMENT_SUBSCRIPTION = gql`
subscription assetDocumentNotification{
  assetDocumentNotification{
    id
    assetId
    assetRequestId
    userId
    fileUrl
    createdAt
    updatedAt
    deletedAt
  }
}
`;

