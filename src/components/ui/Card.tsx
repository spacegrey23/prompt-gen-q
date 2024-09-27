import React from 'react';

const Card = ({ children, ...props }) => {
  return (
    <Card {...props}>
      {children}
    </Card>
  );
};

export default Card;