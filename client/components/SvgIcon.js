import PropTypes from 'prop-types';
import { svgs } from '../config';


const SvgIcon = ({ name, color, className, width, style, title }) => {
  const foundSvg = svgs[name];
  const viewBox = (!!foundSvg && !!foundSvg.viewBox)
    ? foundSvg.viewBox
    : '0 0 32 32';
  const ds = (!!foundSvg && !!foundSvg.ds)
    ? foundSvg.ds
    : [];
  let fill = '#6d6c6c';

  switch(color) {
    case 'red':
      fill = '#e86c52';
      break;
    case 'green':
      fill = '#b2c94c';
      break;
    case 'blue':
      fill = '#497bd3';
      break;
    case 'purple':
      fill = '#9083c9';
      break;
    default:
      fill = '#6d6c6c';
      break;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className || ''}
      width={width ? `${width}px` : '100%'}
      height={width ? `${width}px` : '100%'}
      viewBox={viewBox}
      style={style || {}}
    >
      <g>
        {!!title && !!title.length && (
          <title>{title}</title>
        )}
        {!!ds.length && ds.map((d, i) => (
          <path key={i} fill={fill} d={d} />
        ))}
      </g>
    </svg>
  )
};

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  style: PropTypes.object,
  title: PropTypes.string,
};


export default SvgIcon;
