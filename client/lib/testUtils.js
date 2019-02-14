import casual from 'casual';


// seed it so we get consistent results
casual.seed(777);

const fakeUser = () => ({
  __typename: 'User',
  id: '4234',
  name: casual.name,
  email: casual.email,
  permissions: ['ADMIN'],
  cart: [],
});

const fakeImage = () => ({
  __typename: 'Image',
  id: 'abc123',
  cloudinary_id: "111111",
  name: "peggswatch1",
  width: 22,
  height: 22,
  transformation: "",
  image_url: "peggswatch1.jpg",
  large_image_url: "peggswatch2.jpg",
});


export {
  fakeUser,
  fakeImage,
};
