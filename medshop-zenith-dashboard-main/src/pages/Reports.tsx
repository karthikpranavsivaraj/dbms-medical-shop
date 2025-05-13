
import React from "react";
import PageLayout from "@/components/layout/PageLayout";

const Reports = () => {
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <p className="text-gray-500 mt-1">View your business performance insights</p>
      </div>
      
      <div className="dashboard-card">
        <h2 className="text-lg font-semibold mb-4">Reports Dashboard</h2>
        <p className="text-gray-500">Reports and analytics will be implemented here.</p>
      </div>
    </PageLayout>
  );
};

export default Reports;
