import React from 'react';

const Tabs = ({ children, ...props }) => {
  return (
    <Tabs {...props}>
      {children}
    </Tabs>
  );
};

export default Tabs;