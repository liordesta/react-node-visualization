export const graphStyle = [
  {
    selector: 'node',
    style: {
      'background-color': '#2b1547',
    },
  },
  {
    selector: 'node[label]',
    style: {
      label: 'data(label)',
      color: '#9454f4',
    },
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': '#c4a2f6',
      'line-color': '#c4a2f6',
    },
  },
];
