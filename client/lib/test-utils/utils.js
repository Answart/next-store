import casual from 'casual';


casual.seed(777);

const fakeUser = () => ({
  __typename: 'User',
  id: 'us3r1d',
  name: casual.name,
  email: casual.email,
  password: 'unique-password',
  permissions: ['ADMIN'],
  cart: [],
});

const fakeImage = () => ({
  __typename: 'Image',
  id: '1m4g31d',
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
  id: 'pr0duct1d',
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
  id: 'v4r13nt1d',
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

const fakeCartItem = overrides => ({
  __typename: 'CartItem',
  id: 'c4rt1t3m1d',
  quantity: 3,
  user: fakeUser(),
  variant: fakeVariant(),
  ...overrides,
});


export {
  fakeUser,
  fakeImage,
  fakeProduct,
  fakeVariant,
  fakeCartItem,
};
