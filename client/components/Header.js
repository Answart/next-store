import Link from 'next/link';


const Header = () => (
  <div>
    <div>
      <Link href="/search">
        <a>Search</a>
      </Link>
      <Link href="/">
        <a>Next Store</a>
      </Link>
      <Link href="/account">
        <a>Account</a>
      </Link>
      <div>Cart</div>
    </div>

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
  </div>
)

export default Header;
