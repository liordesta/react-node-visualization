import React from 'react';

import { Graph } from './components/cytoscape/Graph';
import { AceEditor } from './components/ace-editor/AceEditor';

import './App.css';

function App() {
  return (
    <div className='App'>
      {/*<AceEditor />*/}
      <Graph />
    </div>
  );
}

export default App;
