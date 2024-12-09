import { useState } from "react";
import { Wallet, CreditCard, PiggyBank, ShoppingBag, Coffee, Home, Car } from "lucide-react";
import AccountCard from "@/components/AccountCard";
import SpendingChart from "@/components/SpendingChart";
import CategoryList from "@/components/CategoryList";
import AddAccountForm from "@/components/AddAccountForm";
import AddCategoryForm from "@/components/AddCategoryForm";
import AddExpenseForm from "@/components/AddExpenseForm";
import { Button } from "@/components/ui/button";

const initialAccounts = [
  { name: "Main Account", balance: 5240, icon: Wallet },
  { name: "Credit Card", balance: 1800, icon: CreditCard },
  { name: "Savings", balance: 12400, icon: PiggyBank },
];

const initialCategories = [
  { name: "Shopping", amount: 450, percentage: 30, icon: ShoppingBag },
  { name: "Food & Drinks", amount: 300, percentage: 20, icon: Coffee },
  { name: "Housing", amount: 600, percentage: 40, icon: Home },
  { name: "Transportation", amount: 150, percentage: 10, icon: Car },
];

const initialSpendingData = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 900 },
  { month: "Mar", amount: 1500 },
  { month: "Apr", amount: 1100 },
  { month: "May", amount: 1800 },
];

const Index = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [categories, setCategories] = useState(initialCategories);
  const [spendingData, setSpendingData] = useState(initialSpendingData);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const handleAddAccount = (newAccount: any) => {
    setAccounts([...accounts, newAccount]);
    setShowAddAccount(false);
  };

  const handleAddCategory = (newCategory: any) => {
    const totalAmount = categories.reduce((sum, cat) => sum + cat.amount, 0) + newCategory.amount;
    const updatedCategories = categories.map(cat => ({
      ...cat,
      percentage: Math.round((cat.amount / totalAmount) * 100)
    }));
    
    newCategory.percentage = Math.round((newCategory.amount / totalAmount) * 100);
    setCategories([...updatedCategories, newCategory]);
    setShowAddCategory(false);
  };

  const handleAddExpense = ({ amount, accountId, categoryId }: { amount: number, accountId: string, categoryId: string }) => {
    // Update account balance
    const updatedAccounts = accounts.map(account => {
      if (account.name === accountId) {
        return { ...account, balance: account.balance - amount };
      }
      return account;
    });
    setAccounts(updatedAccounts);

    // Update category spending
    const totalAmount = categories.reduce((sum, cat) => {
      if (cat.name === categoryId) {
        return sum + cat.amount + amount;
      }
      return sum + cat.amount;
    }, 0);

    const updatedCategories = categories.map(category => {
      if (category.name === categoryId) {
        const newAmount = category.amount + amount;
        return {
          ...category,
          amount: newAmount,
          percentage: Math.round((newAmount / totalAmount) * 100)
        };
      }
      return {
        ...category,
        percentage: Math.round((category.amount / totalAmount) * 100)
      };
    });
    setCategories(updatedCategories);

    // Update spending chart
    const currentMonth = new Date().toLocaleString('default', { month: 'short' });
    const updatedSpendingData = [...spendingData];
    const monthIndex = updatedSpendingData.findIndex(data => data.month === currentMonth);
    
    if (monthIndex !== -1) {
      updatedSpendingData[monthIndex].amount += amount;
    } else {
      updatedSpendingData.push({ month: currentMonth, amount });
    }
    setSpendingData(updatedSpendingData);

    setShowAddExpense(false);
  };

  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Financial Overview</h1>
          <div className="space-x-4">
            <Button 
              onClick={() => setShowAddAccount(!showAddAccount)}
              variant="outline"
            >
              {showAddAccount ? "Cancel" : "Add Account"}
            </Button>
            <Button 
              onClick={() => setShowAddCategory(!showAddCategory)}
              variant="outline"
            >
              {showAddCategory ? "Cancel" : "Add Category"}
            </Button>
            <Button 
              onClick={() => setShowAddExpense(!showAddExpense)}
              variant="outline"
            >
              {showAddExpense ? "Cancel" : "Add Expense"}
            </Button>
          </div>
        </div>
        
        {showAddAccount && (
          <AddAccountForm onAddAccount={handleAddAccount} />
        )}
        
        {showAddCategory && (
          <AddCategoryForm onAddCategory={handleAddCategory} />
        )}

        {showAddExpense && (
          <AddExpenseForm 
            accounts={accounts}
            categories={categories}
            onAddExpense={handleAddExpense}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <AccountCard
              key={account.name}
              name={account.name}
              balance={account.balance}
              icon={account.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpendingChart data={spendingData} />
          <CategoryList categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default Index;