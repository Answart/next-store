import PropTypes from 'prop-types';
import Link from 'next/link';


const ByCreator = ({ name, online }) => (
  <div className="prdct-creator prdct-padding">
    By
    <Link href={{
      pathname: "/shop",
      query: {
        name: name,
        online: online
      }
    }}><a className="undrln-btn">
      {name}
    </a></Link>
  </div>
);

ByCreator.propTypes = {
  name: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired
};


export default ByCreator;
