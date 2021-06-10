import React from 'react';

import { Graph } from './components/cytoscape/Graph';
import { AceEditor } from './components/ace-editor/AceEditor';

import './App.css';

function App() {
  const onChangeHandler = (data, event) => {
    console.log(data, event);
  };

  return (
    <div className='App'>
      <AceEditor onChange={onChangeHandler} />
      {/*<Graph />*/}
    </div>
  );
}

export default App;
