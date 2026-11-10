import { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useFormDetail } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../store/productStore";

type Slice = {
  name: string;
  value: number;
  color: string;
};

const PALETTE = [
  "#4e79a7",
  "#f58518",
  "#59a14f",
  "#e15759",
  "#76b7b2",
  "#b07aa1",
  "#edc948",
  "#9c755f",
];

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

  // Product name sits just outside the ring
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
  const [userID, setUserID] = useState<String>("");
  const navigate = useNavigate();
  const { authenticateUser } = useFormDetail();
  const { products, allProducts } = useProduct();

  // 1. Authenticate once on mount
  useEffect(() => {
    const handleAuthentication = async () => {
      const { success, user_id } = await authenticateUser();
      if (success) {
        setUserID(user_id);
      } else {
        navigate("/login");
      }
    };
    handleAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Fetch products once we have a user id
  useEffect(() => {
    if (userID) allProducts(userID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  // 3. Pie needs { name, value } rows: map each product's productName and price
  const DATA: Slice[] = useMemo(
    () =>
      (products ?? [])
        .map((p) => ({
          name: String(p.productName),
          value: Number(p.price) || 0,
        }))
        .filter((d) => d.value > 0)
        .sort((a, b) => b.value - a.value)
        .map((d, i) => ({ ...d, color: PALETTE[i % PALETTE.length] })),
    [products]
  );

  const TOTAL = useMemo(() => DATA.reduce((sum, d) => sum + d.value, 0), [DATA]);

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
            {DATA.map((d, i) => (
              <Cell key={`${d.name}-${i}`} fill={d.color} />
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
          textAlign: "center",
        }}
      >
        {DATA.length === 0 ? (
          <span className="text-sm text-gray-500">No products yet</span>
        ) : (
          <>
            <span className="text-lg font-extrabold">{currency.format(TOTAL)}</span>
            <span className="text-sm text-gray-600">total value</span>
          </>
        )}
      </div>
    </div>
  );
}