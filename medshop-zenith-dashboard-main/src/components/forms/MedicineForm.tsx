
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const MedicineForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Add New Medicine</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button>
      </div>
      <form className="space-y-4">
        <div className="floating-input">
          <input id="medicineName" type="text" placeholder=" " />
          <label htmlFor="medicineName">Medicine Name</label>
        </div>
        
        <div className="floating-input">
          <input id="manufacturer" type="text" placeholder=" " />
          <label htmlFor="manufacturer">Manufacturer</label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="floating-input">
            <select id="category" defaultValue="">
              <option value="" disabled></option>
              <option value="tablet">Tablet</option>
              <option value="syrup">Syrup</option>
              <option value="injection">Injection</option>
              <option value="topical">Topical</option>
            </select>
            <label htmlFor="category">Category</label>
          </div>
          
          <div className="floating-input">
            <input id="batch" type="text" placeholder=" " />
            <label htmlFor="batch">Batch Number</label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="floating-input">
            <input id="price" type="number" placeholder=" " min="0" step="0.01" />
            <label htmlFor="price">Price (₹)</label>
          </div>
          
          <div className="floating-input">
            <input id="stock" type="number" placeholder=" " min="0" />
            <label htmlFor="stock">Stock Quantity</label>
          </div>
          
          <div className="floating-input">
            <input id="expiry" type="date" placeholder=" " />
            <label htmlFor="expiry">Expiry Date</label>
          </div>
        </div>
        
        <div className="floating-input">
          <textarea 
            id="description" 
            className="h-20 pt-4 px-3 pb-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-medblue" 
            placeholder=" "
          ></textarea>
          <label htmlFor="description">Description</label>
        </div>
        
        <div className="flex justify-end space-x-3 pt-2">
          <Button 
            variant="outline" 
            type="button" 
            onClick={onClose}
            className="border-medblue text-medblue hover:bg-medblue/10"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-medblue hover:bg-medblue-dark"
          >
            Add Medicine
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MedicineForm;
