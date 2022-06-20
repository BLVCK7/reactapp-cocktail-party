import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    className="cards--item"
    speed={2}
    width={296}
    height={395}
    viewBox="0 0 296 395"
    backgroundColor="#fff"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="20" ry="20" width="296" height="395" />
  </ContentLoader>
);

export default Skeleton;
