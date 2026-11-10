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
/** Minimum vertical space (px) between two outside labels on the same side. */
const LABEL_GAP = 14;
/** Approximate width of one label character at fontSize 10; used to size the side margins. */
const CHAR_WIDTH = 5.6;
/** Hide the % inside the ring for slices smaller than this share. */
const MIN_PERCENT_SHOWN = 0.04;

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
  index: number;
};

/**
 * Recharts calls `label` once per slice with no knowledge of the others, so
 * labels can collide. Here we know every slice's mid-angle up front, so we
 * compute all label positions together, then push neighbours apart on each
 * side of the donut.
 */
function makeLabelRenderer(data: Slice[]) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  // Mid-angle of each slice (same convention Recharts uses: start 90deg, clockwise)
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

      // Forward pass: push each label down until it clears the one above
      let prev = minY - LABEL_GAP;
      for (const i of indexes) {
        ys[i] = Math.max(initial[i], prev + LABEL_GAP);
        prev = ys[i];
      }

      // Backward pass: if we ran past the bottom, pull labels back up
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

    // Percentage sits inside the ring (skipped for tiny slices)
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
            fill="#000"
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

  // 3. One slice per product: { name: productName, value: price }, largest first
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
  const renderLabel = useMemo(() => makeLabelRenderer(DATA), [DATA]);

  // Leave enough room on each side for the longest full product name
  const sideMargin = useMemo(() => {
    const longest = DATA.reduce((max, d) => Math.max(max, d.name.length), 0);
    return Math.min(240, Math.max(90, Math.round(longest * CHAR_WIDTH + 36)));
  }, [DATA]);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 560, aspectRatio: "1 / 1" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 30, right: sideMargin, bottom: 30, left: sideMargin }}>
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