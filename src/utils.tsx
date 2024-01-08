export interface IValue {
  name: string;
  email: string;
  designation: string;
  reporting_manager: string;
}

export class TreeNode {
  value: IValue;
  parent: TreeNode | null;
  descendants: TreeNode[];
  depth: number;
  position: { x: number; y: number };
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.descendants = [];
    this.depth = 0;
    this.position = { x: 0, y: 0 };
  }

  addParent(node: TreeNode) {
    this.parent = node;
    this.parent.descendants.push(this);
    this.updateDepth();
  }
  editValue(newValue: IValue) {
    this.value = newValue;
  }
  updateDepth() {
    let ancestor = this.parent;
    let depth = 0;
    while (ancestor) {
      ancestor = ancestor.parent;
      depth++;
    }
    this.depth = depth;
  }
}

export const constructTree = (data: IValue[]) => {
  let rootNode;
  const rootLevel = data.filter((data) => !data.reporting_manager);
  // in case there is no root level
  if (rootLevel.length === 0 || rootLevel.length > 1) {
    rootNode = new TreeNode({ name: "__ROOT__" });
  }
  if (rootLevel.length === 1) {
    rootNode = new TreeNode(rootLevel[0]);
  }

  const queue = [rootNode];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    const currentEmail = currentNode.value.email;

    data.forEach((item) => {
      if (item.reporting_manager === currentEmail) {
        const newNode = new TreeNode(item);
        newNode.addParent(currentNode);
        queue.push(newNode);
      }
    });
  }

  return rootNode;
};
