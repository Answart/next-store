
const user = {
  id: "cjq2u0j0k9wn50991ayczmcap",
  name: 'alexy',
  email: 'alexy@gmail.com',
  cart:[],
  __typename: "User"
};

const user_two = {
  ...user,
  name: 'answart',
  email: 'answart@sbcglobal.net'
};

const image = {
  cloudinary_id: "111111",
  id: "cjr06a3e80cja0a71ao59lgnb",
  name: "Screen Shot 2019-01-16 at 8.59.25 PM",
  width: 22,
  height: 22,
  transformation: "",
  image_url: "https://res.cloudinary.com/answart/image/upload/v1547702705/nextstore/ifhreq8hdbih0qslden0.png",
  large_image_url: "https://res.cloudinary.com/answart/image/upload/v1547702705/nextstore/ifhreq8hdbih0qslden2.png",
  __typename: "Image"
}
const image2 = {
  ...image,
  id: "2",
  cloudinary_id: "222222"
}
const image3 = {
  ...image,
  id: "3",
  cloudinary_id: "33333"
}

const variant = {
  id: "cjr06bj1e0cnm0a71h8m89l6k",
  availability: "4 in Stock!",
  color: "white",
  price: 35,
  quantity: 4,
  sale: true,
  salePrice: 30,
  size: "S",
  image,
  __typename: "Variant"
}

const variants = [
  {
    ...variant
  }, {
    id: "cjo8awitz7ox30a01gbzxtr4y",
    quantity: 3,
    color: "black",
    size: "M",
    price: 24,
    sale: false,
    salePrice: 0,
    image: image3
  }, {
    id: "cjo8awitz7ox30a01gbzxtr4y",
    quantity: 2,
    color: "red",
    size: "S",
    price: 40,
    sale: true,
    salePrice: 20,
    image: image3
  }
];

const product = {
  id: "cjr06a3sz0cjm0a71kb2wdmbo",
  brand: "Moddurn",
  category: "home",
  department: "decor",
  online: true,
  title: "Modern Wooden Stool",
  description: "Limited Edition stool from the 2018 Fall fashion line.",
  image,
  user,
  variants: [],
  __typename: "Product"
};

product.variants.push(variant);

const products = [
  product,
  {
    id: "cjoc0oaljo2kj0a01qmdo08ai",
    department: "accessories",
    title: "Pegggy",
    description: "Limited.",
    category: "sport",
    brand: "Peggs",
    online: true,
    user,
    variants,
    image
  }
];

variant.product = product;

const cartItem = {
  id: '1234',
  quantity: 5,
  variant,
  user
};

const cart = [{
    ...cartItem
  }, {
    id: '2345',
    quantity: 3,
    variant,
    user
  }, {
    id: '3456',
    quantity: 4,
    variant,
    user
  }, {
    id: '4567',
    quantity: 1,
    variant,
    user
  }, {
    id: '5678',
    quantity: 5,
    variant,
    user
  }, {
    id: '7890',
    quantity: 3,
    variant,
    user
  }, {
    id: '8901',
    quantity: 5,
    variant,
    user
  }, {
    id: '9012',
    quantity: 4,
    variant,
    user
}]

export default product;
export {
  variant,
  variants,
  products,
  user,
  user_two,
  cart,
  cartItem
};
