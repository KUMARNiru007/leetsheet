import React from "react";
import {
  eachDayOfInterval,
  format,
  startOfToday,
  subDays,
  getDay,
  isSameMonth,
  getDaysInMonth,
} from "date-fns";
import clsx from "clsx";

const LoginHeatmap = ({ loginMap = {}, usersByDate }) => {
  const today = startOfToday();
  const startDate = subDays(today, 364); // 365 days total including today

  // Get all days in our range
  const allDays = eachDayOfInterval({
    start: startDate,
    end: today,
  });

  console.log("Total days in range:", allDays.length);
  console.log("Start date:", format(startDate, "yyyy-MM-dd (EEE)"));
  console.log("End date:", format(today, "yyyy-MM-dd (EEE)"));

  // Group days by month for debugging
  const monthCounts = {};
  allDays.forEach((day) => {
    const monthKey = format(day, "yyyy-MM");
    monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
  });
  console.log("Days per month:", monthCounts);

  // Create grid: 53 weeks × 7 days
  const totalWeeks = 53;
  const grid = Array(totalWeeks)
    .fill(null)
    .map(() => Array(7).fill(null));

  // Fill the grid with actual days
  allDays.forEach((day, index) => {
    const daysSinceStart = Math.floor(
      (day - startDate) / (1000 * 60 * 60 * 24)
    );
    const startDayOfWeek = getDay(startDate);
    const totalDaysFromGridStart = daysSinceStart + startDayOfWeek;

    const weekIndex = Math.floor(totalDaysFromGridStart / 7);
    const dayIndex = totalDaysFromGridStart % 7;

    if (weekIndex < totalWeeks && dayIndex < 7) {
      grid[weekIndex][dayIndex] = day;
    }
  });

  // Remove empty weeks at the end
  const weeks = grid.filter((week) => week.some((day) => day !== null));

  // Calculate month labels
  const monthLabels = weeks.map((week, index) => {
    const firstRealDay = week.find((day) => day !== null);

    if (!firstRealDay) {
      return { show: false, label: "" };
    }

    if (index === 0) {
      return { show: true, label: format(firstRealDay, "MMM") };
    }

    const prevWeek = weeks[index - 1];
    const prevFirstRealDay = prevWeek
      ? prevWeek.find((day) => day !== null)
      : null;

    if (!prevFirstRealDay) {
      return { show: true, label: format(firstRealDay, "MMM") };
    }

    const shouldShow = !isSameMonth(firstRealDay, prevFirstRealDay);

    return {
      show: shouldShow,
      label: shouldShow ? format(firstRealDay, "MMM") : "",
    };
  });

  const maxCount = Math.max(1, ...Object.values(loginMap || {}));

  const getDayIntensity = (dateStr) => {
    const loginCount = loginMap[dateStr] || 0;
    if (loginCount <= 0) return 0;
    const ratio = Math.min(1, loginCount / maxCount);
    if (ratio > 0.75) return 4;
    if (ratio > 0.5) return 3;
    if (ratio > 0.25) return 2;
    return 1;
  };

  const hexToRgba = (hex, alpha) => {
    const sanitized = hex.replace('#', '');
    const bigint = parseInt(sanitized, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getCellStyle = (intensity) => {
    const border = `1px solid var(--leetsheet-border-primary)`;
    if (intensity === 0) {
      return {
        backgroundColor: 'var(--leetsheet-bg-tertiary)',
        border,
      };
    }
    const success = getComputedStyle(document.documentElement)
      .getPropertyValue('--leetsheet-orange-light')
      .trim() || '#00b8a3';
    const alphaMap = { 1: 0.25, 2: 0.45, 3: 0.7, 4: 1 };
    return {
      backgroundColor: hexToRgba(success, alphaMap[intensity] || 0.25),
      border,
    };
  };

  return (
    <div className="mt-2">
      <div className="relative">
        {/* Month Labels */}
        <div className="flex mb-2" style={{ color: "var(--leetsheet-text-secondary)" }}>
          {monthLabels.map((month, i) => (
            <div
              key={i}
              className={clsx("text-xs", {
                "ml-2": month.show && i > 0,
              })}
              style={{ width: "15px", marginRight: "2px" }}
            >
              {month.show ? month.label : ""}
            </div>
          ))}
        </div>

        {/* Day labels (Sun, Mon, etc.) */}
        <div className="absolute left-0 top-6 flex flex-col text-xs" style={{ color: "var(--leetsheet-text-secondary)" }}>
          <div className="h-3 mb-1">Sun</div>
          <div className="h-3 mb-1"></div>
          <div className="h-3 mb-1">Tue</div>
          <div className="h-3 mb-1"></div>
          <div className="h-3 mb-1">Thu</div>
          <div className="h-3 mb-1"></div>
          <div className="h-3 mb-1">Sat</div>
        </div>

        {/* Heatmap Grid */}
        <div className="flex gap-1 ml-8">
          {weeks.map((week, weekIdx) => (
            <div
              key={weekIdx}
              className={clsx("flex flex-col gap-1", {
                "ml-2": monthLabels[weekIdx]?.show && weekIdx > 0,
              })}
            >
              {week.map((day, dayIdx) => {
                if (day === null) {
                  return null;
                }

                const dateStr = format(day, "yyyy-MM-dd");
                const loginCount = loginMap[dateStr] || 0;
                const dayUsers = usersByDate?.[dateStr] || null;
                const intensity = getDayIntensity(dateStr);

                const userNames = dayUsers
                  ? dayUsers.map((u) => u?.name || u?.email).filter(Boolean)
                  : [];
                const maxNames = 5;
                const shownNames = userNames.slice(0, maxNames).join(", ");
                const remaining = Math.max(0, userNames.length - maxNames);

                const baseTitle = `${format(
                  day,
                  "MMM d, yyyy"
                )} - ${loginCount} login${loginCount !== 1 ? "s" : ""}`;
                const usersTitle = dayUsers && userNames.length
                  ? `\nUsers: ${shownNames}${remaining ? `, +${remaining} more` : ""}`
                  : "";

                return (
                  <div
                    key={dayIdx}
                    title={`${baseTitle}${usersTitle}`}
                    className={clsx("w-3 h-3 rounded-sm transition-transform duration-150")}
                    style={getCellStyle(intensity)}
                    onMouseEnter={(e) => (e.currentTarget.style.outline = `1px solid var(--leetsheet-border-accent)`)}
                    onMouseLeave={(e) => (e.currentTarget.style.outline = "none")}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginHeatmap;
