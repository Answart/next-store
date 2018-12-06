import { CLOUDINARY_API_KEY, CLOUDINARY_PRESET, CLOUDINARY_SECRET } from '../config';


const uploadImageFile = async function(file) {
  const data = new FormData();
  data.append('apiKey', CLOUDINARY_API_KEY);
  data.append('upload_preset', CLOUDINARY_PRESET);
  data.append('file', file);

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/answart/image/upload', {
      method: 'POST',
      body: data
    }).then(res => res.json());

    if (!!res.error) throw new Error(res.error.message);
    if (!res.eager.length) throw new Error('Response gave no secure_url in res.eager list.');

    return {
      cloudinary_id: res.public_id,
      name: res.original_filename,
      height: res.eager[0].height,
      width: res.eager[0].width,
      transformation: res.eager[0].transformation,
      image_url: res.secure_url,
      large_image_url: res.eager[0].secure_url,
      delete_token: res.delete_token
    }
  } catch(e) {
    console.error('Error creating image file in cloudinary uploadImageFile.', e);
    return { error: true, message: e };
  }
}

const destroyImageFileByToken = async function(token) {
  const data = new FormData();
  data.append('token', token);

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/answart/delete_by_token', {
      method: 'POST',
      body: data
    }).then(res => res.json());

    if (!!res.error) throw res.error.message;
    return res;
  } catch(e) {
    console.error('Error in destroyImageFileByToken image file in cloudinary.', e);
    return { error: true, message: e };
  }
}


export {
  uploadImageFile,
  destroyImageFileByToken
};
