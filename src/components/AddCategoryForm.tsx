import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface Category {
  name: string;
  amount: number;
  percentage: number;
  icon: typeof ShoppingBag;
}

interface AddCategoryFormProps {
  onAddCategory: (category: Category) => void;
}

const AddCategoryForm = ({ onAddCategory }: AddCategoryFormProps) => {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !budget) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onAddCategory({
      name,
      amount: 0,
      percentage: 0,
      icon: ShoppingBag,
    });

    setName("");
    setBudget("");

    toast({
      title: "Success",
      description: "Category added successfully",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Input
            type="number"
            placeholder="Monthly Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Add Category
        </Button>
      </form>
    </Card>
  );
};

export default AddCategoryForm;