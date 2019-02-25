import Link from 'next/link';
import { DEPARTMENTS } from '../../config';
import { capWord } from '../../lib/utils';


const Nav = () => (
  <div className="hdr-nav">
    {DEPARTMENTS.map(dept => (
      <Link key={dept} href={{
        pathname: "/shop",
        query: { department: dept.toLowerCase() }
      }}>
        <a>
          {capWord(dept)}
        </a>
      </Link>
    ))}
  </div>
);


export default Nav;
