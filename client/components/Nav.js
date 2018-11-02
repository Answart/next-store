import Link from 'next/link';


const Nav = () => (
  <div>
    <Link href="/tops">
      <a>Tops</a>
    </Link>
    <Link href="/bottoms" >
      <a>Bottoms</a>
    </Link>
    <Link href="/shoes">
      <a>Shoes</a>
    </Link>
    <Link href="/outwear">
      <a>Outwear</a>
    </Link>
    <Link href="/accessories">
      <a>Accessories</a>
    </Link>
    <Link href="/gifts">
      <a>Home & Gifts</a>
    </Link>
    <Link href="/wedding">
      <a>Wedding</a>
    </Link>
  </div>
);

export default Nav;
