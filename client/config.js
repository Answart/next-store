// Client side config only
export const SERVER_URL = `http://localhost:4242`;
export const PROD_SERVER_URL = `https://us1.prisma.sh/alexandra-6f757c/next-store-app/dev/`;
export const CLOUDINARY_API_KEY = '376449995445936';
export const CLOUDINARY_PRESET = 'nextstore';
export const CLOUDINARY_SECRET = 'yk-s-3xjvyoZl8B2Ue4E01CqhZ4';
export const STRIPE_API_KEY = '';
export const SALES_TAX_RATE = 0.0925;
export const SHIPPING_COST_PER_ITEM = 1.2;
export const theme = {
  red: '#dc3736',
  redOrange: '#e86c52',
  coral: '#ffc5bc',
  orange: '#ed8e40',
  yellow: '#ffdd52',
  green: '#b2c94c',
  blue: '#497bd3',
  darkBlue: '#47505f',
  purple: '#9083c9',
  pink: '#f498b0',
  brown: '#997151',
  gold: '#e8cc68',
  beige: '#f9f6f4',
  offWhite: '#EDEDED',
  lightGrey: '#cbc9c7',
  grey: '#9A9A9A',
  darkGrey: '#6d6c6c',
  black: '#3d3d3d',
  maxWidth: '1050px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};
export const permissions = [
  'ADMIN',
  'USER',
  'PRODUCTCREATE',
  'PRODUCTUPDATE',
  'PRODUCTDELETE',
  'PERMISSIONUPDATE',
];
export const COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'brown',
  'black',
  'white',
  'silver',
  'gold',
  'multi'
];
export const departments = [
  'tops',
  'bottoms',
  'shoes',
  'outwear',
  'accessories',
  'decor',
  'wedding'
];
export const sizes = [
  'XXS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  '1X',
  '2X',
  '3X',
  '4X',
  '0',
  '2',
  '4',
  '6',
  '8',
  '10',
  '12',
  '14',
  '16',
  '18'
];
export const categories = {
  'tops': [
    'blouses', 'cartigans', 'casual', 'sweaters', 'sweatshirts'
  ],
  'bottoms': [
    'skirts', 'pants', 'jeans', 'leggings', 'shorts', 'intimates'
  ],
  'shoes': [
    'heels', 'flats', 'sandals', 'wedges', 'boots', 'booties', 'sneakers'
  ],
  'outwear': [
    'jackets', 'blazers', 'coats', 'cartigans'
  ],
  'accessories': [
    'jewelry', 'bags', 'wallets', 'belts', 'sunglasses', 'makeup', 'hair', 'hats'
  ],
  'decor': [
    'home', 'kitchen', 'office', 'lighting'
  ],
  'wedding': [
    'dresses', 'shoes', 'gifts', 'accessories'
  ]
};
export const orderByList = {
  'name': 'title_DESC',
  'newest': 'createdAt_DESC',
  'oldest': 'createdAt_ASC',
  'updated': 'updatedAt_DESC',
};
export const showList = [ 6, 12, 30, 60 ];
