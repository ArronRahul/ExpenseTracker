import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SpendingChartProps {
  data: Array<{
    month: string;
    amount: number;
  }>;
}

const SpendingChart = ({ data }: SpendingChartProps) => {
  const formatYAxis = (value: number) => `₹${value.toLocaleString('en-IN')}`;
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Monthly Spending</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip 
              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
            />
            <Line type="monotone" dataKey="amount" stroke="#8B5CF6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SpendingChart;