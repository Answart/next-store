import gql from 'graphql-tag';


const CREATE_IMAGE_MUTATION = gql`
  mutation CREATE_IMAGE_MUTATION(
    $cloudinary_id: String!,
    $name: String!,
    $height: Int!,
    $width: Int!,
    $transformation: String!,
    $image_url: String!,
    $large_image_url: String!
  ) {
    createImage(
      cloudinary_id: $cloudinary_id,
      name: $name,
      height: $height,
      width: $width,
      transformation: $transformation,
      image_url: $image_url,
      large_image_url: $large_image_url
    ) {
      id
    }
  }
`;


export {
  CREATE_IMAGE_MUTATION
}
