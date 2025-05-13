
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, Trash2 } from "lucide-react";

const SaleForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [items, setItems] = useState([{ id: Date.now(), medicine: "", quantity: 1, price: 0 }]);
  
  const addItem = () => {
    setItems([...items, { id: Date.now(), medicine: "", quantity: 1, price: 0 }]);
  };
  
  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };
  
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">New Sale</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button>
      </div>
      <form className="space-y-4">
        <div className="floating-input">
          <input id="customerName" type="text" placeholder=" " />
          <label htmlFor="customerName">Customer Name</label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="floating-input">
            <input id="phoneNumber" type="tel" placeholder=" " />
            <label htmlFor="phoneNumber">Phone Number</label>
          </div>
          
          <div className="floating-input">
            <input id="date" type="date" placeholder=" " defaultValue={new Date().toISOString().split('T')[0]} />
            <label htmlFor="date">Date</label>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-md font-medium mb-3">Sale Items</h3>
          
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2">
                <div className="flex-1 floating-input">
                  <select id={`medicine-${index}`} defaultValue="">
                    <option value="" disabled></option>
                    <option value="paracetamol">Paracetamol</option>
                    <option value="amoxicillin">Amoxicillin</option>
                    <option value="azithromycin">Azithromycin</option>
                    <option value="ibuprofen">Ibuprofen</option>
                  </select>
                  <label htmlFor={`medicine-${index}`}>Medicine</label>
                </div>
                
                <div className="w-20 floating-input">
                  <input 
                    id={`quantity-${index}`} 
                    type="number" 
                    placeholder=" " 
                    min="1" 
                    defaultValue="1"
                  />
                  <label htmlFor={`quantity-${index}`}>Qty</label>
                </div>
                
                <div className="w-24 floating-input">
                  <input 
                    id={`price-${index}`} 
                    type="number" 
                    placeholder=" " 
                    step="0.01" 
                    defaultValue="0.00"
                    readOnly
                  />
                  <label htmlFor={`price-${index}`}>Price</label>
                </div>
                
                <button 
                  type="button" 
                  className={`p-2 text-gray-500 hover:text-red-500 ${items.length === 1 ? 'invisible' : ''}`}
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          
          <button 
            type="button" 
            className="mt-3 flex items-center text-sm text-medblue hover:text-medblue-dark"
            onClick={addItem}
          >
            <Plus size={16} className="mr-1" />
            Add Another Item
          </button>
        </div>
        
        <div className="flex justify-between items-center border-t pt-4">
          <div className="text-lg font-semibold">
            <span className="text-gray-600">Total:</span> ₹240.00
          </div>
          <div className="flex space-x-3">
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
              Complete Sale
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SaleForm;
