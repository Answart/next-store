
const user = {
  id: "cjpj0izxabhkj0a15jmipydzc",
  name: 'alexy',
  email: 'alexy@gmail.com'
};

const image = {
  id: "1",
  cloudinary_id: "111111",
  name: "peggswatch1",
  width: 22,
  height: 22,
  transformation: "",
  image_url: "peggswatch1.jpg",
  large_image_url: "peggswatch1.jpg",
}
const image2 = {
  id: "2",
  cloudinary_id: "222222",
  name: "peggswatch2",
  width: 22,
  height: 22,
  transformation: "",
  image_url: "peggswatch2.jpg",
  large_image_url: "peggswatch2.jpg",
}
const image3 = {
  id: "3",
  cloudinary_id: "33333",
  name: "peggswatch3",
  width: 22,
  height: 22,
  transformation: "",
  image_url: "peggswatch3.jpg",
  large_image_url: "peggswatch3.jpg",
}

const variants = [
  {
    id: "cjo8awitz7ox30a01gbzxtr4y",
    quantity: 3,
    color: "Black",
    size: "S",
    price: 14,
    sale: true,
    salePrice: 12,
    image: image2
  }, {
    id: "cjo8awitz7ox30a01gbzxtr4y",
    quantity: 3,
    color: "Black",
    size: "M",
    price: 24,
    sale: false,
    salePrice: 0,
    image: image3
  }, {
    id: "cjo8awitz7ox30a01gbzxtr4y",
    quantity: 2,
    color: "Red",
    size: "S",
    price: 40,
    sale: true,
    salePrice: 20,
    image: image3
  }
];

const product = {
  id: "cjoc0irhbo26r0a0121ub69i3",
  department: "Accessories",
  title: "Peggs Gold Edition Analog Watch Peggs Gold Edition Analog ",
  description: "Limited Edition watch from the 2018 Fall fashion line.",
  category: "Sport",
  brand: "Peggs",
  online: false,
  user,
  variants,
  image
};

const products = [
  product,
  {
    id: "cjoc0oaljo2kj0a01qmdo08ai",
    department: "Accessories",
    title: "Pegggy",
    description: "Limited.",
    category: "Sport",
    brand: "Peggs",
    online: true,
    user,
    variants,
    image
  }
];

let variant = { ...variants[0] };
variant.product = product;

const cart = [{
    id: '1234',
    variant: variant
  }, {
    id: '2345',
    variant: variant
  }, {
    id: '3456',
    variant: variant
  }, {
    id: '4567',
    variant: variant
  }, {
    id: '5678',
    variant: variant
  }, {
    id: '7890',
    variant: variant
  }, {
    id: '8901',
    variant: variant
  }, {
    id: '9012',
    variant: variant
}]

export default product;
export {
  variants,
  products,
  user,
  cart
};
