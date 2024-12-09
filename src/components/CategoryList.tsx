import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface Category {
  name: string;
  amount: number;
  percentage: number;
  icon: LucideIcon;
}

interface CategoryListProps {
  categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <category.icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="font-semibold">₹{category.amount.toLocaleString('en-IN')}</span>
            </div>
            <Progress value={category.percentage} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CategoryList;