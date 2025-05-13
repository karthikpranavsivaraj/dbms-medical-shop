
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Inventory = () => {
  return (
    <PageLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <Button className="bg-medblue hover:bg-medblue-dark flex items-center">
          <Plus size={18} className="mr-2" />
          Add Medicine
        </Button>
      </div>
      
      <div className="dashboard-card">
        <h2 className="text-lg font-semibold mb-4">Medicine Inventory</h2>
        <p className="text-gray-500">Inventory data will be implemented here.</p>
      </div>
    </PageLayout>
  );
};

export default Inventory;
