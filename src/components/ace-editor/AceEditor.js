import React from 'react';

import ReactAce from 'react-ace-editor';

export const AceEditor = () => {
  const onChangeHandler = (newValue, event) => {
    console.log(newValue, event);
    /*     const editor = ace.editor;
    console.log(editor.getValue()); */
  };

  return (
    <>
      <ReactAce
        mode='javascript'
        theme='twilight'
        setReadOnly={false}
        onChange={onChangeHandler}
      />
    </>
  );
};
