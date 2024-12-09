import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "./ui/use-toast";

interface Account {
  name: string;
  balance: number;
  icon: any;
}

interface Category {
  name: string;
  amount: number;
  percentage: number;
  icon: any;
}

interface AddExpenseFormProps {
  accounts: Account[];
  categories: Category[];
  onAddExpense: (expense: {
    amount: number;
    accountId: string;
    categoryId: string;
  }) => void;
}

const AddExpenseForm = ({ accounts, categories, onAddExpense }: AddExpenseFormProps) => {
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !selectedAccount || !selectedCategory) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onAddExpense({
      amount: parseFloat(amount),
      accountId: selectedAccount,
      categoryId: selectedCategory,
    });

    setAmount("");
    setSelectedAccount("");
    setSelectedCategory("");

    toast({
      title: "Success",
      description: "Expense added successfully",
    });
  };

  return (
    <Card className="p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium text-gray-700">
            Amount (₹)
          </label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="account" className="text-sm font-medium text-gray-700">
            Select Account
          </label>
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger id="account" className="w-full bg-white">
              <SelectValue placeholder="Choose account" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {accounts.map((account) => (
                <SelectItem 
                  key={account.name} 
                  value={account.name}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">
            Select Category
          </label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category" className="w-full bg-white">
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {categories.map((category) => (
                <SelectItem 
                  key={category.name} 
                  value={category.name}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full mt-6">
          Add Expense
        </Button>
      </form>
    </Card>
  );
};

export default AddExpenseForm;