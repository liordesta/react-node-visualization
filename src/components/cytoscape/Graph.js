import React from 'react';

import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import cola from 'cytoscape-cola';

import { graphStyle } from './graphStyle';

cytoscape.use(cola);

export const Graph = (props) => {
  const nodes = props.data.nodes;
  const edges = props.data.edges;
  const layout = { name: 'cola' };

  return (
    <CytoscapeComponent
      elements={CytoscapeComponent.normalizeElements({
        nodes: nodes,
        edges: edges,
      })}
      layout={layout}
      style={{ width: window.innerWidth, height: 600 }}
      stylesheet={graphStyle}
      minZoom={0.5}
      maxZoom={2}
      cy={(cy) => {
        cy.layout(layout).run();
      }}
    />
  );
};
