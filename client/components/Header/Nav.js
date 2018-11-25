import Link from 'next/link';
import departments from '../../lib/departments';


const Nav = () => (
  <div className='hdr-nav'>
    {departments.map(dept => (
      <Link key={dept} href={{
        pathname: `/shop`,
        query: { department: dept.toLowerCase() }
      }}>
        <a>{dept}</a>
      </Link>
    ))}
  </div>
);


export default Nav;
