import React from 'react';

type NodeType = {
  title: string;
  titleBG: 'green' | 'blue';
  children: React.ReactNode;
};

const Node = ({ title, titleBG = 'green', children }: NodeType) => {
  return (
    <div className="rounded-md bg-white shadow-xl border w-96">
      <p
        className={`rounded-t-md px-2 py-1 bg-${titleBG}-500 text-white text-sm`}
      >
        {title}
      </p>
      <div className="p-2">{children}</div>
    </div>
  );
};

export default Node;
