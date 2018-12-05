import PropTypes from 'prop-types';
import Link from 'next/link';


const ByCreator = props => {
  const query = {
    name: props.name
  }
  if (!!props.online) query.online = props.online;
  return (
    <div className="prdct-creator prdct-padding">
      By
      <Link href={{
        pathname: `/shop`,
        query
      }}><a className="undrln-btn">
        {props.name}
      </a></Link>
    </div>
  )
};

ByCreator.propTypes = {
  name: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired
};


export default ByCreator;
