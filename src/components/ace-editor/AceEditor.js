import React from 'react';

import ReactAce from 'react-ace-editor';

const mockData = [
  { data: { id: 'one', label: 'Node 1' } },
  { data: { id: 'two', label: 'Node 2' } },
  { data: { id: 'three', label: 'Node 3' } },
  { data: { id: 'four', label: 'Node 4' } },
];

export const AceEditor = (props) => {
  return (
    <>
      <ReactAce
        document='json'
        mode='json'
        theme='twilight'
        setReadOnly={false}
        onChange={props.onChange}
        style={{ width: window.innerWidth, height: '400px' }}
        setValue={JSON.stringify(mockData, null, 2)}
      />
    </>
  );
};
