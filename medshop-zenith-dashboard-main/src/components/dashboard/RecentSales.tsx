
import React from "react";

type Sale = {
  id: string;
  customer: string;
  date: string;
  amount: string;
  items: number;
};

const RecentSales: React.FC<{ sales: Sale[] }> = ({ sales }) => {
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Sales</h2>
        <button className="text-sm text-medblue hover:underline">View All</button>
      </div>
      <div className="space-y-4">
        {sales.map((sale) => (
          <div key={sale.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{sale.customer}</p>
              <p className="text-sm text-gray-500">{sale.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{sale.amount}</p>
              <p className="text-sm text-gray-500">{sale.items} items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSales;
