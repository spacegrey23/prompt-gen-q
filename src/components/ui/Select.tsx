import React from 'react';

const Select = ({ children, ...props }) => {
  return (
    <Select {...props}>
      {children}
    </Select>
  );
};

export default Select;