import { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useFormDetail } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../store/productStore";

type Slice = {
  name: string;
  value: number; // units in stock
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

/** Minimum vertical space (px) between two outside labels on the same side. */
const LABEL_GAP = 14;
/** Approximate width of one label character at fontSize 10; used to size the side margins. */
const CHAR_WIDTH = 5.6;
/** Hide the % inside the pie for slices smaller than this share. */
const MIN_PERCENT_SHOWN = 0.04;

const RAD = Math.PI / 180;

type LabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
  index: number;
};

/**
 * Computes every label position together so neighbouring labels never overlap,
 * then draws each name in a column beside the pie with a leader line.
 */
function makeLabelRenderer(data: Slice[]) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  // Mid-angle of each slice (start 90deg, clockwise)
  let cumulative = 0;
  const mids = data.map((d) => {
    const mid = 90 - 360 * ((cumulative + d.value / 2) / total);
    cumulative += d.value;
    return mid;
  });

  let cacheKey = "";
  let ys: number[] = [];

  const layout = (cx: number, cy: number, outerRadius: number) => {
    const key = `${cx}|${cy}|${outerRadius}`;
    if (key === cacheKey) return ys;
    cacheKey = key;

    const initial = mids.map((m) => cy + (outerRadius + 12) * Math.sin(-m * RAD));
    ys = [...initial];

    const minY = cy - outerRadius - 20;
    const maxY = cy + outerRadius + 20;

    const spread = (indexes: number[]) => {
      indexes.sort((a, b) => initial[a] - initial[b]);

      let prev = minY - LABEL_GAP;
      for (const i of indexes) {
        ys[i] = Math.max(initial[i], prev + LABEL_GAP);
        prev = ys[i];
      }

      let next = maxY + LABEL_GAP;
      for (let k = indexes.length - 1; k >= 0; k--) {
        const i = indexes[k];
        ys[i] = Math.min(ys[i], next - LABEL_GAP);
        next = ys[i];
      }
    };

    const right: number[] = [];
    const left: number[] = [];
    mids.forEach((m, i) => (Math.cos(-m * RAD) >= 0 ? right : left).push(i));
    spread(right);
    spread(left);

    return ys;
  };

  return function renderLabel({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
    index,
  }: LabelProps) {
    const cos = Math.cos(-midAngle * RAD);
    const sin = Math.sin(-midAngle * RAD);
    const isRight = cos >= 0;

    // Percentage sits inside the slice
    const inner = innerRadius + (outerRadius - innerRadius) * 0.65;
    const px = cx + inner * cos;
    const py = cy + inner * sin;

    // Leader line: slice edge -> elbow -> label column
    const labelY = layout(cx, cy, outerRadius)[index];
    const sx = cx + (outerRadius + 2) * cos;
    const sy = cy + (outerRadius + 2) * sin;
    const ex = cx + (outerRadius + 12) * cos;
    const ey = cy + (outerRadius + 12) * sin;
    const labelX = cx + (isRight ? 1 : -1) * (outerRadius + 24);

    return (
      <g>
        {percent >= MIN_PERCENT_SHOWN && (
          <text
            x={px}
            y={py}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={10}
            fill="#fff"
            fontWeight={600}
          >
            {`${Math.round(percent * 100)}%`}
          </text>
        )}

        <polyline
          points={`${sx},${sy} ${ex},${ey} ${labelX},${labelY}`}
          fill="none"
          stroke="#999"
          strokeWidth={1}
        />
        <text
          x={labelX + (isRight ? 4 : -4)}
          y={labelY}
          textAnchor={isRight ? "start" : "end"}
          dominantBaseline="central"
          fontSize={10}
          fill="#111"
        >
          {name}
        </text>
      </g>
    );
  };
}

export default function StockDistributionPie() {
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

  // 3. Units in stock per category, largest first
  const DATA: Slice[] = useMemo(() => {
    const totals = new Map<string, number>();

    for (const p of products ?? []) {
      // Adjust these field names to match your product type
      const category = String((p as any).category || "Uncategorized");
      const units = Number((p as any).quantity ?? (p as any).stock) || 0;

      totals.set(category, (totals.get(category) ?? 0) + units);
    }

    return Array.from(totals, ([name, value]) => ({ name, value }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value)
      .map((d, i) => ({ ...d, color: PALETTE[i % PALETTE.length] }));
  }, [products]);

  const renderLabel = useMemo(() => makeLabelRenderer(DATA), [DATA]);

  // Leave enough room on each side for the longest category name
  const sideMargin = useMemo(() => {
    const longest = DATA.reduce((max, d) => Math.max(max, d.name.length), 0);
    return Math.min(240, Math.max(90, Math.round(longest * CHAR_WIDTH + 36)));
  }, [DATA]);

  if (DATA.length === 0) {
    return (
      <div className="flex h-64 w-full max-w-xl items-center justify-center text-sm text-gray-500">
        No stock data yet
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl">
      <div style={{ width: "100%", aspectRatio: "1 / 1" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 30, right: sideMargin, bottom: 30, left: sideMargin }}>
            <Pie
              data={DATA}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              stroke="#fff"
              strokeWidth={2}
              labelLine={false}
              label={renderLabel as any}
              isAnimationActive={false}
            >
              {DATA.map((d, i) => (
                <Cell key={`${d.name}-${i}`} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value} units`, "Stock"]}
              contentStyle={{ borderRadius: 8, fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}