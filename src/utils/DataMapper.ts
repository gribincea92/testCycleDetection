import { EdgeData, NodeData } from 'reaflow';
import { InputNodeMapType } from 'types/InputNodeMapType';

const mapToNodeDataList = (input: InputNodeMapType): NodeData[] => {
  const keys = Object.keys(input);
  return keys.map((i) => ({
    id: i,
    text: i,
  }));
};

const mapToEdgeDataList = (input: InputNodeMapType): EdgeData[] => {
  const edges: EdgeData[] = [];

  Object.entries(input).forEach(([node, nodeContent]) => {
    const { adjList } = nodeContent;
    adjList.forEach((adjNode) => {
      edges.push({
        id: `${node}-${adjNode}`,
        from: node,
        to: adjNode,
      });
    });
  });

  return edges;
};

export default {
  mapToNodeDataList,
  mapToEdgeDataList,
};
