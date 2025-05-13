import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import StatCard from "@/components/dashboard/StatCard";
import InventoryTable from "@/components/dashboard/InventoryTable";
import RecentSales from "@/components/dashboard/RecentSales";
import MedicineForm from "@/components/forms/MedicineForm";
import SaleForm from "@/components/forms/SaleForm";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, TrendingUp, Users, Plus } from "lucide-react";

const Index = () => {
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [showAddSale, setShowAddSale] = useState(false);

  const inventoryData = [
    { id: "1", name: "Paracetamol 500mg", category: "Tablet", stock: 2500, price: "₹2.50", status: "In Stock" as const },
    { id: "2", name: "Amoxicillin 250mg", category: "Tablet", stock: 1200, price: "₹5.00", status: "In Stock" as const },
    { id: "3", name: "Azithromycin 500mg", category: "Tablet", stock: 350, price: "₹12.00", status: "Low Stock" as const },
    { id: "4", name: "Antacid Syrup", category: "Syrup", stock: 120, price: "₹85.00", status: "Low Stock" as const },
    { id: "5", name: "Vitamin B Complex", category: "Tablet", stock: 0, price: "₹8.50", status: "Out of Stock" as const },
  ];

  const salesData = [
    { id: "1", customer: "Anil Kumar", date: "Today, 2:30 PM", amount: "₹450.00", items: 3 },
    { id: "2", customer: "Priya Sharma", date: "Today, 11:15 AM", amount: "₹280.00", items: 2 },
    { id: "3", customer: "Rajesh Singh", date: "Yesterday, 6:45 PM", amount: "₹750.50", items: 5 },
    { id: "4", customer: "Anita Desai", date: "Yesterday, 9:20 AM", amount: "₹125.00", items: 1 },
  ];

  return (
    <PageLayout>
      {/* Action buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button 
          onClick={() => setShowAddSale(true)} 
          className="bg-medblue hover:bg-medblue-dark flex items-center"
        >
          <Plus size={18} className="mr-2" />
          New Sale
        </Button>
        <Button 
          onClick={() => setShowAddMedicine(true)}
          variant="outline"
          className="border-medblue text-medblue hover:bg-medblue/10 flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Medicine
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 animate-fade-in">
        <StatCard 
          title="Today's Sales" 
          value="₹12,450" 
          icon={ShoppingCart} 
          change={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Total Products" 
          value="845" 
          icon={Package}
          change={{ value: 4, isPositive: true }}
        />
        <StatCard 
          title="Monthly Revenue" 
          value="₹3.2L" 
          icon={TrendingUp}
          change={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Total Customers" 
          value="2,150" 
          icon={Users}
          change={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <InventoryTable items={inventoryData} />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <RecentSales sales={salesData} />
        </div>
      </div>

      {/* Forms */}
      {showAddMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="max-w-2xl w-full">
            <MedicineForm onClose={() => setShowAddMedicine(false)} />
          </div>
        </div>
      )}

      {showAddSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="max-w-2xl w-full">
            <SaleForm onClose={() => setShowAddSale(false)} />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Index;
