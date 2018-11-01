import Link from 'next/link';


const Nav = () => (
    <div>
      <Link href="/new" >
        <a>New</a>
      </Link>
      <Link href="/tops">
        <a>Tops</a>
      </Link>
      <Link href="/bottoms">
        <a>Bottoms</a>
      </Link>
      <Link href="/shoes">
        <a>Shoes</a>
      </Link>
      <Link href="/accessories">
        <a>Accessories</a>
      </Link>
      <Link href="/sale">
        <a>Sale</a>
      </Link>
    </div>
);

export default Nav;
