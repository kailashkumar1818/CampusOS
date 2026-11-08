import React from 'react';

const Card = ({ children, className = '', title, subtitle, action, footer }) => {
  return (
    <div className={`bg-white dark:bg-surface-900 border border-slate-200/80 dark:border-surface-800/80 rounded-xl shadow-sm overflow-hidden ${className}`}>
      {(title || subtitle || action) && (
        <div className="px-6 py-4 border-b border-slate-100 dark:border-surface-800 flex items-center justify-between">
          <div>
            {title && <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-3 bg-slate-50/50 dark:bg-surface-950/40 border-t border-slate-100 dark:border-surface-800">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;

