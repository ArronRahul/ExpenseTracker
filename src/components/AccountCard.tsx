import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AccountCardProps {
  name: string;
  balance: number;
  icon: LucideIcon;
}

const AccountCard = ({ name, balance, icon: Icon }: AccountCardProps) => {
  return (
    <Card className="p-6 animate-scale-in hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-lg">{name}</h3>
          <p className="text-2xl font-bold">₹{balance.toLocaleString('en-IN')}</p>
        </div>
      </div>
    </Card>
  );
};

export default AccountCard;