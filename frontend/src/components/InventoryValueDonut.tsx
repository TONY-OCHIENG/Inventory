import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useFormDetail } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../store/productStore";

type Category = {
  name: string;
  value: number;
  color: string;
};

const DATA: Category[] = [
  { name: "Electronics", value: 183000, color: "#4e79a7" },
  { name: "Clothing", value: 96000, color: "#f58518" },
  { name: "Home & Kitchen", value: 73000, color: "#59a14f" },
  { name: "Beauty", value: 50000, color: "#e15759" },
  { name: "Toys", value: 32000, color: "#76b7b2" },
  { name: "Office", value: 23000, color: "#b07aa1" },
];

const TOTAL = DATA.reduce((sum, d) => sum + d.value, 0);
const RAD = Math.PI / 180;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

type LabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
};

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: LabelProps) => {
  const cos = Math.cos(-midAngle * RAD);
  const sin = Math.sin(-midAngle * RAD);

  // Percentage sits inside the ring, near its outer edge
  const inner = innerRadius + (outerRadius - innerRadius) * 0.65;
  const px = cx + inner * cos;
  const py = cy + inner * sin;

  // Category name sits just outside the ring
  const outer = outerRadius + 18;
  const nx = cx + outer * cos;
  const ny = cy + outer * sin;

  return (
    <g>
      <text
        x={px}
        y={py}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fill="#000"
      >
        {`${Math.round(percent * 100)}%`}
      </text>
      <text
        x={nx}
        y={ny}
        textAnchor={cos >= 0 ? "start" : "end"}
        dominantBaseline="central"
        fontSize={10}
        fill="#111"
      >
        {name}
      </text>
    </g>
  );
};

export default function InventoryValueDonut() {
    const [userID, setuserID] = useState<String>("")
    const navigate = useNavigate()
    let limit = 10
    const { authenticateUser } = useFormDetail()
    const { product, setProducts} = useProduct()

    useEffect(() => {
        handleAuthentication()
        setProducts(userID,1,limit)
    },[userID])
    const handleAuthentication = async () => {
        const { success, user_id} = await authenticateUser()
        if (success) {
            setuserID(user_id)
        } else {
            navigate("/login")
        }
    }
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 560, aspectRatio: "1 / 1" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 30, right: 80, bottom: 30, left: 80 }}>
          <Pie
            data={DATA}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            stroke="#fff"
            strokeWidth={3}
            labelLine={false}
            label={renderLabel as any}
            isAnimationActive={false}
          >
            {DATA.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center total */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          fontWeight: 700,
          fontSize: 26,
          lineHeight: 1.2,
          textAlign: "center",
        }}
      >
        <span className="text-sm font-extrabold">{currency.format(TOTAL)}</span>
        <span className="text-sm text-gray-600">total value</span>
      </div>
    </div>
  );
}