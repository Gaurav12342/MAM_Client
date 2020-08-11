import gql from 'graphql-tag'

export const DELETE_ASSETS_REQUEST = gql`
mutation deleteAssetRequest($id: ID){
  deleteAssetRequest(where : {id : $id})
}
`;

export const CREATE_ASSETS_REQUEST = gql`
mutation createAssetRequest($title: String,$description: String,$fileUrls: [Upload],$deliveryDate: Date,$brandColor:[BrandColorCreateInput],$shareWith:[String],$assets: [AssetCreateInput]){
    createAssetRequest(data: {title : $title, description:$description,fileUrls:$fileUrls,brandColor:$brandColor,deliveryDate:$deliveryDate,shareWith:$shareWith,assets:$assets}){
      id
    title
    description
    deliveryDate
    fileUrls
    brandColor{
      labelName
      colorCode
    }
    shareWith{
      id
      name
      email
      profileImage
      role
      token
      createdAt
      updatedAt
      deletedAt
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
      transparentBg
      derivativeDetails{
        extensions
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
      token
    }
    }
}
`;

export const UPDATE_ASSETS_REQUEST = gql`
mutation updateAssetRequest($id:ID ,$title: String,$description: String,$fileUrls: [Upload],$deliveryDate: Date,$brandColor:[BrandColorCreateInput],$shareWith:[String],$assets:[AssetCreateInput]){
  updateAssetRequest(where : {id :$id},data: {title : $title, description:$description,fileUrls:$fileUrls,brandColor:$brandColor,deliveryDate:$deliveryDate,shareWith:$shareWith,assets:$assets}){
    id
    title
    description
    deliveryDate
    fileUrls
    brandColor{
      labelName
      colorCode
    }
    shareWith{
      id
      name
      email
      profileImage
      role
      token
      createdAt
      updatedAt
      deletedAt
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
      transparentBg
      derivativeDetails{
        extensions
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
      token
    }
  }
}
`;

export const UPDATE_SHARE_WITH_USER = gql`
mutation updateAssetRequest($id:ID $shareWith:[String]){
  updateAssetRequest(where : {id :$id},data: {shareWith:$shareWith}){
    id
    shareWith{
      id
      email
    }
  }
}
`;

export const CREATE_ASSETS_DOCUMENTS = gql`
mutation createAssetDocument($fileUrl: Upload,$assetRequestId: ID,$assetId: ID,$userId: ID){
  createAssetDocument(data : {fileUrl: $fileUrl,assetRequestId: $assetRequestId,assetId: $assetId,userId: $userId } ){
    id
    fileUrl
    asset{
      id
      title
      description
      fileUrls
      extensions
      maxFileSize
      height
      width
      transparentBg
    }
    assetRequest{
      id
      title
      description
      deliveryDate
      fileUrls
      brandColor{
        colorCode
        labelName
      }
      shareWith{
        id
        name
        email
      }
    }
    user {
      id
      name
      email
    }
    createdAt
    updatedAt
  }
}
`;

export const CREATE_ASSETS_TEMPLATE = gql`
mutation createAssetTemplate($title: String,$description: String,$extensions: Extensions,$maxFileSize: Float,$height: Float,$width: Float,$transparentBg: Boolean,$derivativeDetails: [DerivativeDetailsCreateInput],$userId: ID){
  createAssetTemplate(data : {title: $title,description: $description,extensions: $extensions,maxFileSize:$maxFileSize,height:$height,width:$width,transparentBg: $transparentBg,derivativeDetails: $derivativeDetails,userId: $userId}){
    id
    title
    description
    extensions
    maxFileSize
    height
    width
    transparentBg
    derivativeDetails{
      extensions
      maxFileSize
      height
      width
    }
    user{
      id
    }
    createdAt
    updatedAt
    deletedAt
  }
} 
`;