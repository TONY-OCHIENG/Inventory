import { useEffect, useMemo, useState } from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFormDetail } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../store/productStore";

type DayPoint = {
  day: string; // short label for the axis, e.g. "10 Nov"
  full: string; // long label for the tooltip, e.g. "Tue, 10 Nov 2026"
  inbound: number;
  outbound: number;
  gap: [number, number];
};

const GREEN = "#55a24a";
const RED = "#e45756";
const DAYS_SHOWN = 30; // change to 7, 14, 60, 90...

const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

/**
 * ADJUST THIS to match your product type.
 * Returns the stock movements a product contributes:
 *  - inbound: units received, dated by when the product was added
 *  - outbound: units sold/removed, dated by when it was last updated
 * If your API has a real movement/sales history, build these from that instead.
 */
function getMovements(p: any): { date: Date; inbound: number; outbound: number }[] {
  const added = new Date(p.createdAt ?? p.dateAdded ?? p.created_at);
  const updated = new Date(p.updatedAt ?? p.updated_at ?? p.createdAt ?? p.dateAdded ?? p.created_at);

  const inbound = Number(p.quantity ?? p.stock) || 0;
  const outbound = Number(p.sold ?? p.soldQuantity) || 0;

  const out: { date: Date; inbound: number; outbound: number }[] = [];
  if (!Number.isNaN(added.getTime()) && inbound > 0) out.push({ date: added, inbound, outbound: 0 });
  if (!Number.isNaN(updated.getTime()) && outbound > 0) out.push({ date: updated, inbound: 0, outbound });
  return out;
}

export default function StockMovementChart({ className = "" }: { className?: string }) {
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

  // 3. Bucket movements into the last DAYS_SHOWN days (today included)
  const DATA: DayPoint[] = useMemo(() => {
    const now = new Date();
    const buckets = new Map<string, DayPoint>();

    for (let i = DAYS_SHOWN - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      buckets.set(dayKey(d), {
        day: d.toLocaleString("en-GB", { day: "numeric", month: "short" }),
        full: d.toLocaleString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        inbound: 0,
        outbound: 0,
        gap: [0, 0],
      });
    }

    for (const p of products ?? []) {
      for (const m of getMovements(p)) {
        const bucket = buckets.get(dayKey(m.date));
        if (!bucket) continue; // outside the window
        bucket.inbound += m.inbound;
        bucket.outbound += m.outbound;
      }
    }

    return Array.from(buckets.values()).map((b) => ({
      ...b,
      gap: [Math.min(b.inbound, b.outbound), Math.max(b.inbound, b.outbound)] as [number, number],
    }));
  }, [products]);

  const hasData = DATA.some((d) => d.inbound > 0 || d.outbound > 0);

  if (!hasData) {
    return (
      <div className="flex h-64 w-full max-w-4xl items-center justify-center text-sm text-gray-500">
        No stock movement in the last {DAYS_SHOWN} days
      </div>
    );
  }

  return (
    <div className={`h-[420px] w-full max-w-4xl ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={DATA} margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
          <CartesianGrid vertical={false} stroke="#e5e5e5" strokeOpacity={0.8} />

          <XAxis
            dataKey="day"
            interval="preserveStartEnd"
            minTickGap={24}
            tickLine={{ stroke: "#000" }}
            axisLine={{ stroke: "#000" }}
            tick={{ fontSize: 12, fill: "#000" }}
            padding={{ left: 16, right: 16 }}
          />
          <YAxis
            allowDecimals={false}
            tickLine={{ stroke: "#000" }}
            axisLine={{ stroke: "#000" }}
            tick={{ fontSize: 12, fill: "#000" }}
            label={{
              value: "Units",
              angle: -90,
              position: "insideLeft",
              offset: 4,
              style: { fontSize: 12, textAnchor: "middle" },
            }}
          />

          <Tooltip
            cursor={{ stroke: "#bbb", strokeDasharray: "3 3" }}
            contentStyle={{ borderRadius: 8, fontSize: 12 }}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.full ?? ""}
          />
          <Legend verticalAlign="top" align="left" iconType="circle" wrapperStyle={{ fontSize: 13 }} />

          {/* Shaded band between the two series (hidden from tooltip and legend) */}
          <Area
            dataKey="gap"
            stroke="none"
            fill="#9e9e9e"
            fillOpacity={0.15}
            tooltipType="none"
            legendType="none"
            isAnimationActive={false}
          />

          <Line
            type="linear"
            dataKey="inbound"
            name="Inbound"
            stroke={GREEN}
            strokeWidth={3}
            dot={{ r: 3, fill: GREEN, stroke: GREEN }}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="outbound"
            name="Outbound"
            stroke={RED}
            strokeWidth={3}
            dot={{ r: 3, fill: RED, stroke: RED }}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}