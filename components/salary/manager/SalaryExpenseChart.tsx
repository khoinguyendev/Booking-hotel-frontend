'use client';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const salaryExpenseData = [
  {
    month: 'T3',
    totalSalary: 420000000,
  },
  {
    month: 'T4',
    totalSalary: 455000000,
  },
  {
    month: 'T5',
    totalSalary: 470000000,
  },
  {
    month: 'T6',
    totalSalary: 510000000,
  },
  {
    month: 'T7',
    totalSalary: 548000000,
  },
  {
    month: 'T8',
    totalSalary: 586000000,
  },
];

const formatCurrency = (value: number) =>
  value.toLocaleString('vi-VN');

export default function SalaryExpenseChart() {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Quỹ lương theo tháng
        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="h-[320px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={salaryExpenseData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
              />

              <YAxis
                tickFormatter={(
                  value,
                ) =>
                  `${(
                    value /
                    1000000
                  ).toFixed(0)}M`
                }
              />

              <Tooltip
                formatter={(
                  value: number,
                ) =>
                  `${formatCurrency(
                    value,
                  )} ₫`
                }
              />

              <Line
                type="monotone"
                dataKey="totalSalary"
                strokeWidth={3}
                dot={{
                  r: 5,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </CardContent>

    </Card>
  );
}