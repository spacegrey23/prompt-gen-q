import React from 'react';

const TextArea = ({ children, ...props }) => {
  return (
    <TextArea {...props}>
      {children}
    </TextArea>
  );
};

export default TextArea;