import React from 'react';

const Skeleton = ({ className = '', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-slate-200 dark:bg-surface-800 rounded-md ${className}`}
        />
      ))}
    </>
  );
};

export default Skeleton;

