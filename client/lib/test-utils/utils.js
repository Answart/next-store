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
const mockUser = fakeUser();

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
const mockImage = fakeImage();
const mockImageVariables = {
  cloudinary_id: mockImage.cloudinary_id,
  name: mockImage.name,
  height: mockImage.height,
  width: mockImage.width,
  transformation: mockImage.transformation,
  image_url: mockImage.image_url,
  large_image_url: mockImage.large_image_url
};

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
const mockProduct = fakeProduct();
const mockShopProductsVariables = {
  name: mockUser.name,
  orderBy: 'createdAt_DESC',
  skip: 0,
  first: 1
 };

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
const mockVariant = fakeVariant();

const fakeCartItem = overrides => ({
  __typename: 'CartItem',
  id: 'c4rt1t3m1d',
  quantity: 3,
  user: fakeUser(),
  variant: fakeVariant(),
  ...overrides,
});
const mockCartItem = fakeCartItem();


export {
  fakeUser, mockUser,
  fakeImage, mockImage, mockImageVariables,
  fakeProduct, mockProduct, mockShopProductsVariables,
  fakeVariant, mockVariant,
  fakeCartItem, mockCartItem,
};
