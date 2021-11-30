import { InputNodeMapType } from 'types/InputNodeMapType';
import { InputNodeDataType } from 'types/InputNodeDataType';

const isCyclicUtil = (nodeMap: InputNodeMapType, node: string, data: InputNodeDataType) => {
  // Mark the current node as visited and part of recursion stack
  if (data.recStack) {
    return true;
  }
  if (data.visited) {
    return false;
  }

  data.visited = true;
  data.recStack = true;

  const children = data.adjList;
  for (const c of children) {
    if (isCyclicUtil(nodeMap, c, nodeMap[c])) {
      return true;
    }
  }

  data.recStack = false;

  return false;
};

const isCyclic = (nodeMap: InputNodeMapType): boolean => {
  // Mark all the vertices as not visited and
  // not part of recursion stack
  for (const node in nodeMap) {
    nodeMap[node].visited = false;
    nodeMap[node].recStack = false;
  }

  for (const [node, data] of Object.entries(nodeMap)) {
    if (isCyclicUtil(nodeMap, node, data)) {
      return true;
    }
  }

  return false;
};

export default {
  isCyclic,
};
