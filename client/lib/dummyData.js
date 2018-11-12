
const user = {
  id: "cjobtu6tgni0p0a010vdol4oy",
  name: 'alexy',
  email: 'alexy@gmail.com'
};

const productVariants = [
  {
    id: "cjo8awitz7ox30a01gbzxtr4y",
    quantity: 3,
    color: "Black",
    size: "S",
    price: 4400
  }, {
    id: "cjo8awitz7ox30a01gbzxtr4y",
    quantity: 3,
    color: "Black",
    size: "M",
    price: 4400
  }, {
    id: "cjo8awitz7ox30a01gbzxtr4y",
    quantity: 2,
    color: "Red",
    size: "S",
    price: 4000
  }
];

const product = {
  id: "cjoc0irhbo26r0a0121ub69i3",
  department: "Accessories",
  title: "Peggs Gold Edition Analog Watch Peggs Gold Edition Analog ",
  description: "Limited Edition watch from the 2018 Fall fashion line.",
  image: "peggswatch.jpg",
  category: "Sport",
  brand: "Peggs",
  online: false,
  url: "",
  user,
  productVariants
};


const products = [
  product,
  {
    id: "cjoc0oaljo2kj0a01qmdo08ai",
    department: "Accessories",
    title: "Pegggy",
    description: "Limited.",
    image: "peggswatch2.jpg",
    category: "Sport",
    brand: "Peggs",
    online: true,
    url: "",
    user,
    productVariants
  }
];

export default product;
export {
  productVariants,
  products,
  user
};
