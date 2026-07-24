"use client";

import { useEffect, useMemo, useState } from "react";
import { FiEye, FiPhone } from "react-icons/fi";
import { FaLine } from "react-icons/fa";
import { supabase } from "../../lib/supabase";

type Daily = {
  day: string;
  pageviews: number;
  line_clicks: number;
  phone_clicks: number;
};
type TopPage = { path: string; n: number };

const card = "rounded-xl border border-line bg-surface p-5 shadow-xs";

const RANGES = [
  { days: 7, label: "7 วัน" },
  { days: 30, label: "30 วัน" },
  { days: 90, label: "90 วัน" },
];

// dailyKey = column from event_daily(); allKey = event type for the all-time count
const metrics = [
  { dailyKey: "pageviews", allKey: "pageview", label: "ผู้เข้าชม", icon: FiEye, color: "text-accent", swatch: "bg-accent" },
  { dailyKey: "line_clicks", allKey: "line_click", label: "คลิก LINE", icon: FaLine, color: "text-[#06C755]", swatch: "bg-[#06C755]" },
  { dailyKey: "phone_clicks", allKey: "phone_click", label: "คลิกโทร", icon: FiPhone, color: "text-brand", swatch: "bg-brand" },
] as const;

export default function AdminStats() {
  // ponytail: aggregation happens in Postgres (event_daily / event_top_pages RPCs) so we never
  // ship raw rows or hit the 1000-row cap. Range change just refetches the two cheap aggregates.
  const [days, setDays] = useState(30);
  const [daily, setDaily] = useState<Daily[]>([]);
  const [top, setTop] = useState<TopPage[]>([]);
  const [totals, setTotals] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    metrics.forEach(async ({ allKey }) => {
      const { count } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true })
        .eq("type", allKey);
      setTotals((t) => ({ ...t, [allKey]: count ?? 0 }));
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      supabase.rpc("event_daily", { days_back: days }),
      supabase.rpc("event_top_pages", { days_back: days }),
    ]).then(([d, t]) => {
      if (cancelled) return;
      setDaily((d.data as Daily[]) ?? []);
      setTop((t.data as TopPage[]) ?? []);
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [days]);

  const { rangeTotal, bars, series } = useMemo(() => {
    const rangeTotal = (key: string) =>
      daily.reduce((s, d) => s + Number(d[key as keyof Daily] ?? 0), 0);
    const bars = daily.map((d) => {
      const [, m, dd] = d.day.split("-");
      return { label: `${+dd}/${+m}` };
    });

    // 0..100 x 0..100 viewBox (stretched with preserveAspectRatio=none)
    const n = daily.length;
    const xs = (i: number) => (n <= 1 ? 0 : (i / (n - 1)) * 100);

    // Catmull-Rom → cubic bezier for a smooth (non-jagged) curve
    const smooth = (coords: [number, number][]) => {
      if (!coords.length) return "";
      let p = `M ${coords[0][0]} ${coords[0][1]}`;
      for (let i = 0; i < coords.length - 1; i++) {
        const p0 = coords[i - 1] ?? coords[i];
        const p1 = coords[i];
        const p2 = coords[i + 1];
        const p3 = coords[i + 2] ?? p2;
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        p += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`;
      }
      return p;
    };

    // one line per metric, each normalized to its own peak so all three are visible
    const series = metrics.map((m) => {
      const vals = daily.map((d) => Number(d[m.dailyKey as keyof Daily] ?? 0));
      const max = Math.max(1, ...vals);
      const coords = vals.map(
        (v, i): [number, number] => [xs(i), 100 - (v / max) * 100],
      );
      const linePath = smooth(coords);
      return {
        key: m.dailyKey,
        color: m.color,
        swatch: m.swatch,
        pts: coords,
        linePath,
        areaPath:
          m.dailyKey === "pageviews" && linePath
            ? `${linePath} L 100 100 L 0 100 Z`
            : "",
      };
    });

    return { rangeTotal, bars, series };
  }, [daily]);

  const labelEvery = Math.ceil(days / 12);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink">สถิติเว็บไซต์</h1>
          <p className="mt-1 text-sm text-ink-body">
            ยอดผู้เข้าชมและการคลิกปุ่มติดต่อ (ไม่นับหน้า admin)
          </p>
        </div>
        <div className="inline-flex rounded-lg border border-line bg-surface p-0.5 shadow-xs">
          {RANGES.map((r) => (
            <button
              key={r.days}
              type="button"
              onClick={() => setDays(r.days)}
              className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                days === r.days
                  ? "bg-brand text-on-brand"
                  : "text-ink-body hover:text-ink"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {metrics.map(({ dailyKey, allKey, label, icon: Icon, color }) => {
          const n = rangeTotal(dailyKey);
          return (
            <div key={dailyKey} className={card}>
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-md bg-surface-2">
                  <Icon size={16} className={color} aria-hidden />
                </span>
                <p className="text-sm font-medium text-ink">{label}</p>
              </div>
              <p className="mt-4 font-display text-4xl tabular-nums text-ink">
                {loaded ? n.toLocaleString() : "–"}
                <span className="ml-2 align-middle font-sans text-xs font-normal text-ink-body">
                  ในช่วง {days} วัน
                </span>
              </p>
              <div className="mt-3 flex gap-4 border-t border-line pt-3 text-xs text-ink-body">
                <span>
                  เฉลี่ย{" "}
                  <span className="font-medium tabular-nums text-ink">
                    {loaded ? Math.round(n / days) : "–"}
                  </span>
                  /วัน
                </span>
                <span>
                  ทั้งหมด{" "}
                  <span className="font-medium tabular-nums text-ink">
                    {(totals[allKey] ?? 0).toLocaleString()}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`mt-4 ${card}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-ink">
            แนวโน้มรายวัน ({days} วันล่าสุด)
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-body">
            {metrics.map((m) => (
              <span key={m.dailyKey} className="flex items-center gap-1.5">
                <span className={`inline-block h-0.5 w-4 rounded ${m.swatch}`} />
                {m.label}
              </span>
            ))}
          </div>
        </div>
        {bars.length === 0 ? (
          <p className="mt-5 py-12 text-center text-sm text-ink-body">
            {loaded ? "ยังไม่มีข้อมูล" : "กำลังโหลด…"}
          </p>
        ) : (
          <>
            <div className="relative mt-5">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="h-40 w-full overflow-visible"
                aria-hidden
              >
                <defs>
                  <linearGradient id="pv-area" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="currentColor"
                      stopOpacity="0.22"
                    />
                    <stop
                      offset="100%"
                      stopColor="currentColor"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                {series.map((s) => (
                  <g key={s.key} className={s.color}>
                    {s.areaPath && (
                      <path d={s.areaPath} fill="url(#pv-area)" stroke="none" />
                    )}
                    <path
                      d={s.linePath}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                ))}
              </svg>

              {/* one transparent hover zone per day */}
              <div
                className="absolute inset-0 flex"
                onMouseLeave={() => setHover(null)}
              >
                {bars.map((_, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    onMouseEnter={() => setHover(i)}
                  />
                ))}
              </div>

              {hover !== null && daily[hover] && (
                <>
                  {/* vertical guide + a dot per line */}
                  <div
                    className="pointer-events-none absolute inset-y-0 w-px bg-ink/15"
                    style={{ left: `${series[0]?.pts[hover]?.[0] ?? 0}%` }}
                  />
                  {series.map((s) => (
                    <div
                      key={s.key}
                      className={`pointer-events-none absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-surface ${s.swatch}`}
                      style={{
                        left: `${s.pts[hover][0]}%`,
                        top: `${s.pts[hover][1]}%`,
                      }}
                    />
                  ))}
                  {/* readout pinned to the top-right corner of the chart */}
                  <div className="pointer-events-none absolute right-0 top-0 rounded-lg border border-line bg-surface/95 px-3 py-2 text-xs shadow-lg backdrop-blur-sm">
                    <p className="font-medium text-ink">{bars[hover].label}</p>
                    {metrics.map((m) => (
                      <p
                        key={m.dailyKey}
                        className="mt-1 flex items-center justify-between gap-4"
                      >
                        <span className="flex items-center gap-1.5 text-ink-body">
                          <span
                            className={`size-1.5 rounded-full ${m.swatch}`}
                          />
                          {m.label}
                        </span>
                        <span className="font-medium tabular-nums text-ink">
                          {Number(
                            daily[hover][m.dailyKey as keyof Daily] ?? 0,
                          ).toLocaleString()}
                        </span>
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="mt-1.5 flex">
              {bars.map((b, i) => (
                <span
                  key={i}
                  className="flex-1 text-center text-[0.55rem] tabular-nums text-ink-body/70"
                >
                  {i % labelEvery === 0 ? b.label : ""}
                </span>
              ))}
            </div>
            <p className="mt-2 text-[0.7rem] text-ink-body/70">
              * แต่ละเส้นปรับสเกลตามจุดสูงสุดของตัวเอง (ดูแนวโน้ม ไม่ใช่จำนวนเทียบกัน)
            </p>
          </>
        )}
      </div>

      <div className={`mt-4 ${card}`}>
        <p className="text-sm font-medium text-ink">
          หน้าที่เข้าชมมากสุด ({days} วัน)
        </p>
        <ul className="mt-3 divide-y divide-line">
          {top.length === 0 && (
            <li className="py-3 text-sm text-ink-body">ยังไม่มีข้อมูล</li>
          )}
          {top.map((p) => (
            <li
              key={p.path}
              className="flex items-center justify-between gap-3 py-2.5 text-sm"
            >
              <span className="truncate text-ink">{p.path || "/"}</span>
              <span className="shrink-0 font-medium tabular-nums text-ink-body">
                {Number(p.n).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
