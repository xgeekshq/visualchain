import React from 'react';
import cn from '../../utils/cn';

type NodeType = {
  title: string;
  titleBG?:
    | 'bg-green-500'
    | 'bg-blue-500'
    | 'bg-yellow-500'
    | 'bg-red-500'
    | 'bg-gray-500'
    | 'bg-purple-500';
  size?: 'md' | 'auto';
  children: React.ReactNode;
};

const Node = ({
  title,
  titleBG = 'bg-green-500',
  size = 'md',
  children,
}: NodeType) => {
  return (
    <div
      className={cn(
        'rounded-md bg-white shadow-xl border',
        size === 'md' && 'w-96',
      )}
    >
      <p className={cn('rounded-t-md px-2 py-1 text-white text-sm', titleBG)}>
        {title}
      </p>
      <div className="p-2">{children}</div>
    </div>
  );
};

export default Node;
