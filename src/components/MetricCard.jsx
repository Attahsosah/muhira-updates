import React from 'react';

function MetricCard({ metric, title, icon: Icon, bg = 'bg-violet-50', text = 'text-violet-600', sub }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-5">
        <p className="text-sm font-semibold text-gray-500">{title}</p>
        {Icon && (
          <span className={`${bg} ${text} p-2.5 rounded-xl`}>
            <Icon className="text-[18px]" />
          </span>
        )}
      </div>
      <p className="text-4xl font-black text-gray-900 tracking-tight">{metric}</p>
      {sub && <p className="text-xs text-gray-400 mt-2 font-medium">{sub}</p>}
    </div>
  );
}

export default MetricCard;
