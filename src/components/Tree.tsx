import Card from "@/components/Card";
import { TreeNode } from "@/utils";
import React, { useMemo, useRef } from "react";

const Tree = ({
  node,
  marginLeft = 10,
  parentPos = null,
}: {
  node: TreeNode;
  marginLeft: number;
  parentPos: any;
}) => {
  const nodeRef = useRef<any>(null);
  const { x, y } = nodeRef.current?.getBoundingClientRect() ?? { x: 0, y: 0 };
  const leafNodes = useMemo(() => {
    let count = 0;
    const recur = (treeNode) => {
      if (treeNode.descendants.length === 0) {
        count++;
        return;
      }
      treeNode.descendants.forEach((childNode) => {
        recur(childNode);
      });
    };
    recur(node);
    return count;
  }, [node]);

  return (
    <div
      className="flex flex-col relative "
      style={{
        width: (leafNodes + 1) * 140,
      }}
    >
      <div ref={nodeRef} className="flex p-2 ">
        <Card {...node.value} node={node} />
      </div>
      <div
        className="rounded-full border-2 border-slate-400"
        style={{ width: node.descendants.length * 260 }}
      ></div>
      <div className="flex">
        {node.descendants.length > 0 &&
          node.descendants.map((childNode) => {
            return (
              <div className="" key={childNode.value.email}>
                <Tree
                  node={childNode}
                  marginLeft={marginLeft + 40}
                  parentPos={{ x, y }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Tree;
//   <svg width="342" height="342" xmlns="http://www.w3.org/2000/svg">
//     <path d="M2 2 L408 408" stroke="black" />
//   </svg>;
