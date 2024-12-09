import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface Account {
  name: string;
  balance: number;
  icon: typeof Wallet;
}

interface AddAccountFormProps {
  onAddAccount: (account: Account) => void;
}

const AddAccountForm = ({ onAddAccount }: AddAccountFormProps) => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !balance) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onAddAccount({
      name,
      balance: parseFloat(balance),
      icon: Wallet,
    });

    setName("");
    setBalance("");

    toast({
      title: "Success",
      description: "Account added successfully",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Account Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Input
            type="number"
            placeholder="Initial Balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Add Account
        </Button>
      </form>
    </Card>
  );
};

export default AddAccountForm;