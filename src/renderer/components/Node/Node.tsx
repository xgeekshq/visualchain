import React from 'react';
import cn from '../../utils/cn';
import { NodeSize, TitleBackground } from '../../types/styles';

type NodeType = {
  title?: string;
  size?: NodeSize;
  titleBG?: TitleBackground;
  children: React.ReactNode;
};

const NODE_SIZE = {
  sm: 'w-42',
  md: 'w-96',
  lg: 'w-[600px]',
  xl: 'w-auto',
};

const Node = ({
  title,
  titleBG = 'bg-green-500',
  size = 'md',
  children,
}: NodeType) => {
  const nodeSize = NODE_SIZE[size];

  return (
    <div className={cn('rounded-md bg-white shadow-xl border', nodeSize)}>
      {title && (
        <p className={cn('rounded-t-md px-2 py-1 text-white text-sm', titleBG)}>
          {title}
        </p>
      )}
      <div className="p-2">{children}</div>
    </div>
  );
};

export default Node;
