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

const fakeProduct = () => ({
  __typename: 'Product',
  id: 'abc123',
  department: "accessories",
  title: "Peggs Gold Edition Analog Watch Peggs Gold Edition Analog ",
  description: "Limited Edition watch from the 2018 Fall fashion line.",
  category: "sport",
  brand: "Peggs",
  online: false,
  user: fakeUser(),
  variants: [],
  image: fakeImage(),
});

const fakeVariant = () => ({
  __typename: 'Variant',
  id: 'abc123',
  availability: "4 in Stock!",
  color: "white",
  price: 35,
  quantity: 4,
  sale: true,
  salePrice: 30,
  size: "S",
  image: fakeImage(),
  product: fakeProduct()
});


export {
  fakeUser,
  fakeImage,
  fakeProduct,
  fakeVariant,
};
