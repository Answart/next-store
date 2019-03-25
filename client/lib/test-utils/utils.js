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
  category: "jewelry",
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

const fakeOrder = () => ({
  __typename: 'Order',
  id: '0rd3r1d',
  charge: 'ch_123',
  total: 4000,
  status: 'processing',
  quantity: 3,
  subtotal: 20,
  shipping: 1.5,
  tax: 1.02,
  total: 20,
  sales_tax_rate: 1.02,
  shipping_rate: 1.02,
  payment: 'some payment',
  items: [],
  buyer: fakeUser(),
  createdAt: '2018-04 - 06T19: 24: 16.000Z',
  updatedAt: '2018-04 - 06T19: 24: 16.000Z',
});

const fakeOrderItem = () => ({
  __typename: 'OrderItem',
  id: '0rd3r1t3m1d',
  title: 'order item title',
  price: 12,
  quantity: 2,
  color: 'green',
  size: 'L',
  image_url: 'some_img_url',
  seller: fakeUser(),
  variant: fakeVariant(),
  order: fakeOrder(),
  createdAt: '2018-04 - 06T19: 24: 16.000Z',
  updatedAt: '2018-04 - 06T19: 24: 16.000Z',
});


export {
  fakeUser,
  fakeImage,
  fakeProduct,
  fakeVariant,
  fakeCartItem,
  fakeOrder,
  fakeOrderItem,
};
