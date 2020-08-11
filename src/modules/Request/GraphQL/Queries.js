import gql from 'graphql-tag'

export const GET_ALL_ASSETS_REQUEST = gql`
query getAssetRequests{
    getAssetRequests{
        id
        title
        description
        deliveryDate
        shareWith{
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
        updatedAt
        assets{
            id
            title
            description
            fileUrls
            maxFileSize
            height
            width
            status
            transparentBg
            derivativeDetails{
                maxFileSize
                height
                width
            }
        }
        user{
            id
            name
            email
            profileImage
            role
        }
    }
}
`

export const GET_SPECIFIC_ASSETS_REQUEST = gql`
query getAssetRequest($assetRequestId: ID ){
    getAssetRequest(where: {id : $assetRequestId}){
        id
    title
    description
    deliveryDate
    fileUrls
    shareWith{
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
    brandColor{
      colorCode
      labelName
    }
    user{
        id
        name
    }
    assets{
      id
      title
      description
      fileUrls
      extensions
      maxFileSize
      height
      width
      status
      transparentBg
      derivativeDetails{
        extensions
        maxFileSize
        height
        width
      }

    }
    updatedAt
    }
}
`

export const GET_ALL_USERS = gql`
query getUsers{
    getUsers{
        id
        name
        email
        profileImage
        role
    }
}
`;

export const GET_SPECIFIC_ASSET_DOCUMENT=gql`
query getAssetDocuments($assetId: ID,$assetRequestId: ID,$assetLabel: AssetLabel){
    getAssetDocuments(where: {assetId: $assetId,assetRequestId: $assetRequestId,assetLabel:$assetLabel }){
        id
        assetLabel
        asset{
            id
        }
        assetRequest{
            id
        }
        # user{
        #     id
        # }
        fileUrl
        createdAt
    }
}
`; 