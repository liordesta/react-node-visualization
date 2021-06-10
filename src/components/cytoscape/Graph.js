import React from 'react';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import cola from 'cytoscape-cola';

cytoscape.use(cola);

const elements = [
  { data: { id: 'one', label: 'Node 1' } },
  { data: { id: 'two', label: 'Node 2' } },
  { data: { id: 'three', label: 'Node 3' } },
  { data: { id: 'four', label: 'Node 4' } },
  { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
  {
    data: { source: 'one', target: 'three', label: 'Edge from Node1 to Node2' },
  },
  {
    data: { source: 'three', target: 'one', label: 'Edge from Node1 to Node2' },
  },
  {
    data: { source: 'four', target: 'one', label: 'Edge from Node1 to Node2' },
  },
  {
    data: { source: 'four', target: 'two', label: 'Edge from Node1 to Node2' },
  },
  {
    data: {
      source: 'four',
      target: 'three',
      label: 'Edge from Node1 to Node2',
    },
  },
];

export const Graph = () => {
  const layout = { name: 'cola' };

  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: window.innerWidth, height: window.innerHeight }}
      layout={layout}
    />
  );
};
