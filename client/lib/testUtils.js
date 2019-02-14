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


export {
  fakeUser,
};
