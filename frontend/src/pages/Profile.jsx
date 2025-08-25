import { useEffect, useMemo } from "react";
import {
  Mail,
  BookOpenCheck,
  Trophy,
  Code2,
  Loader,
  Calendar,
  Flame,
  Target,
  Award,
  Languages,
  Clock,
  TrendingUp,
  ChartNoAxesCombined,
  BarChart3,
  CheckCircle,
  Activity,
  BarChart2,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useProblemStore } from "../store/useProblemStore.js";
import { useSubmissionStore } from "../store/useSubmissionStore.js";
import { useUserStore } from "../store/useUserStore.js";
import LoginHeatmap from "../components/LoginHeatmap.jsx";
import profile from "./assets/avatar1.webp";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Profile = () => {
  const { authUser, checkAuth } = useAuthStore();
  const {
    solvedProblems,
    getSolvedProblemByUser,
    getAllProblems,
    problems,
    isProblemsLoading,
  } = useProblemStore();

  const { isLoading, submissions, getAllSubmissions } = useSubmissionStore();
  const { users, activeUsers, isLoading: isUsersLoading, getAllUsers, getActiveUsers } = useUserStore();
  const isAdmin = authUser?.role === "ADMIN";

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  useEffect(() => {
    getAllSubmissions();
  }, [getAllSubmissions]);

  // Admin-only: fetch users lists
  useEffect(() => {
    if (isAdmin) {
      getAllUsers(false);
      getActiveUsers(14);
    }
  }, [isAdmin, getAllUsers, getActiveUsers]);

  console.log("Submissions: ", submissions);

  const loginMap = authUser?.loginMap || {};
  // For admin: build aggregated login map from all users
  const aggregatedLoginMap = useMemo(() => {
    if (!isAdmin) return loginMap;
    const map = {};
    (users || []).forEach((u) => {
      const lm = u?.loginMap || {};
      Object.keys(lm).forEach((dateKey) => {
        const val = Number(lm[dateKey]) || 0;
        map[dateKey] = (map[dateKey] || 0) + (val > 0 ? 1 : 0);
      });
    });
    return map;
  }, [isAdmin, users, loginMap]);

  // Build usersByDate index for admin tooltips
  const usersByDate = useMemo(() => {
    if (!isAdmin) return undefined;
    const dateToUsers = {};
    (users || []).forEach((u) => {
      const lm = u?.loginMap || {};
      Object.keys(lm).forEach((dateKey) => {
        const hasActivity = Number(lm[dateKey]) > 0;
        if (!hasActivity) return;
        if (!dateToUsers[dateKey]) dateToUsers[dateKey] = [];
        dateToUsers[dateKey].push({ id: u.id, name: u.name, email: u.email });
      });
    });
    return dateToUsers;
  }, [isAdmin, users]);

  // Derived metrics from activity map (no hard-coded values)
  const activeDaysCount = useMemo(() => {
    return Object.values(loginMap).reduce(
      (acc, v) => acc + (v > 0 ? 1 : 0),
      0
    );
  }, [loginMap]);

  const currentStreakComputed = useMemo(() => {
    const dates = Object.keys(loginMap).sort();
    if (!dates.length) return 0;
    let streak = 0;
    let prev = null;
    for (let i = dates.length - 1; i >= 0; i -= 1) {
      const key = dates[i];
      const has = loginMap[key] > 0;
      const d = new Date(key);
      if (!has) {
        if (streak === 0 && prev === null) continue;
        break;
      }
      if (prev === null) {
        streak = 1;
        prev = d;
        continue;
      }
      const diffDays = Math.round((prev - d) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak += 1;
        prev = d;
      } else if (diffDays > 1) {
        break;
      }
    }
    return streak;
  }, [loginMap]);

  const bestStreakComputed = useMemo(() => {
    const dates = Object.keys(loginMap).sort();
    if (!dates.length) return 0;
    let best = 0;
    let curr = 0;
    let prev = null;
    for (let i = 0; i < dates.length; i += 1) {
      const key = dates[i];
      const has = loginMap[key] > 0;
      const d = new Date(key);
      if (!has) {
        best = Math.max(best, curr);
        curr = 0;
        prev = null;
        continue;
      }
      if (prev === null) {
        curr = 1;
        prev = d;
      } else {
        const diffDays = Math.round((d - prev) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          curr += 1;
          prev = d;
        } else if (diffDays > 1) {
          best = Math.max(best, curr);
          curr = 1;
          prev = d;
        }
      }
    }
    return Math.max(best, curr);
  }, [loginMap]);

  const SolvedProblems = useMemo(() => {
    return (problems || []).filter((problem) =>
      problem.solvedBy?.some((user) => user.userId === authUser?.id)
    );
  }, [problems, authUser]);

  const languageFrequency = useMemo(() => {
    const frequencyMap = {};
    (submissions || []).forEach((submission) => {
      const language = submission.language;
      if (language) {
        frequencyMap[language] = (frequencyMap[language] || 0) + 1;
      }
    });
    return frequencyMap;
  }, [submissions]);

  const total = (problems || []).length;
  const solved = (solvedProblems || []).length;

  // Attempting: unique problems that have submissions but aren't solved yet
  const attempting = useMemo(() => {
    const submittedProblemIds = new Set((submissions || []).map((s) => s.problemId));
    const solvedProblemIds = new Set((solvedProblems || []).map((p) => p.id));
    let count = 0;
    submittedProblemIds.forEach((pid) => {
      if (!solvedProblemIds.has(pid)) count += 1;
    });
    return count;
  }, [submissions, solvedProblems]);

  const easy = {
    solved: (solvedProblems || []).filter((p) => p.difficulty === "EASY").length,
    total: (problems || []).filter((p) => p.difficulty === "EASY").length,
  };

  const medium = {
    solved: (solvedProblems || []).filter((p) => p.difficulty === "MEDIUM").length,
    total: (problems || []).filter((p) => p.difficulty === "MEDIUM").length,
  };

  const hard = {
    solved: (solvedProblems || []).filter((p) => p.difficulty === "HARD").length,
    total: (problems || []).filter((p) => p.difficulty === "HARD").length,
  };

  const languagesUsed = useMemo(() => {
    return Object.keys(languageFrequency).sort(
      (a, b) => languageFrequency[b] - languageFrequency[a]
    );
  }, [languageFrequency]);

  const mostUsedLanguage = useMemo(() => {
    return languagesUsed[0] || "N/A";
  }, [languagesUsed]);

  const averageTime = useMemo(() => {
    if (!submissions || !submissions.length) return "0 s";
    const toAvgSeconds = (timeData) => {
      try {
        const arr = JSON.parse(timeData || "[]").map((t) =>
          parseFloat(String(t).split(" ")[0])
        );
        if (!arr.length || arr.some((n) => Number.isNaN(n))) return 0;
        return arr.reduce((a, b) => a + b, 0) / arr.length; // seconds
      } catch {
        return 0;
      }
    };
    const secs = submissions
      .map((s) => toAvgSeconds(s.time))
      .reduce((a, b) => a + b, 0) / Math.max(1, submissions.length);
    if (secs < 60) return `${secs.toFixed(2)} s`;
    const m = Math.floor(secs / 60);
    const s = Math.round(secs % 60);
    return s === 0 ? `${m} min` : `${m}m ${s}s`;
  }, [submissions]);
  
  const totalSubmissions = (submissions || []).length;
  const successRate = total > 0 ? Math.round((solved / total) * 100) : 0;
  
  let rank = "Beginner";
  if (successRate >= 0 && successRate <= 20) {
    rank = "Beginner";
  } else if (successRate > 20 && successRate <= 60) {
    rank = "Intermediate";
  } else if (successRate > 60 && successRate <= 95) {
    rank = "Expert";
  } else {
    rank = "Master";
  }

  const difficultyStats = [
    {
      name: "Easy",
      solved: easy.solved,
      total: easy.total,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      name: "Medium",
      solved: medium.solved,
      total: medium.total,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      name: "Hard",
      solved: hard.solved,
      total: hard.total,
      color: "bg-red-500",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
  ];

  // Show loading state if critical data is still loading
  if (!authUser && isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-3 mt-3">
      {/* Header Section */}
      <div className="card-leetsheet rounded-xl">
        <div className="p-2">
          <div className="flex flex-col lg:flex-row items-center gap-2">
            {/* Profile Info */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={authUser?.image || profile}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4"
                  style={{ borderColor: "var(--leetsheet-border-accent)" }}
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">
                  {authUser?.name || "John Doe"}
                </h1>
                <p className="flex items-center gap-2" style={{ color: "var(--leetsheet-text-secondary)" }}>
                  <Mail className="w-4 h-4" />
                  {authUser?.email || "sanket@example.com"}
                </p>
                {isAdmin && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "#1f2937", color: "#f59e0b" }}>
                    ADMIN
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold badge-leetsheet warning mt-1" style={{ gap: "0.25rem" }}>
                  <Trophy className="w-4 h-4" />
                  {rank}
                </span>
              </div>
            </div>

            {/* Streak & Activity Cards */}
            <div className="flex flex-col sm:flex-row gap-3 ml-auto">
              <div className="card-leetsheet p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Flame className="w-5 h-5" style={{ color: "var(--leetsheet-error)" }} />
                  <span className="font-semibold" style={{ color: "var(--leetsheet-text-secondary)" }}>
                    Current Streak
                  </span>
                  <p className="text-2xl font-normal mb-0">
                    {authUser?.streakCount ?? currentStreakComputed}
                  </p>
                </div>
              </div>

              <div className="card-leetsheet p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Award className="w-5 h-5" style={{ color: "var(--leetsheet-orange)" }} />
                  <span className="font-semibold " style={{ color: "var(--leetsheet-text-secondary)" }}>
                    Best Streak
                  </span>
                  <p className="text-2xl font-medium mb-0" style={{ color: "var(--leetsheet-orange)" }}>
                    {authUser?.longestCount ?? bestStreakComputed}
                  </p>
                </div>
              </div>

              <div className="card-leetsheet p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold " style={{ color: "var(--leetsheet-text-secondary)" }}>
                    Active Days
                  </span>
                  <p className="text-2xl font-medium mb-0">
                    {activeDaysCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Progress Overview */}
        <div className="card-leetsheet rounded-xl overflow-hidden">
          <div className="p-2 pb-5" style={{ borderBottom: "1px solid var(--leetsheet-border-primary)" }}>
            <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
              <ChartNoAxesCombined className="w-5 h-5" />
              Progress Overview
            </h3>
          </div>
          <div className="p-2 space-y-6">
            <div className="flex items-center justify-center ">
              <div className="w-40 h-40">
                <CircularProgressbarWithChildren
                  value={solved}
                  maxValue={total}
                  strokeWidth={4}
                  styles={buildStyles({
                    pathColor: "var(--leetsheet-orange)",
                    trailColor: "var(--leetsheet-border-primary)",
                    textColor: "var(--leetsheet-text-primary)",
                  })}
                >
                  <div className="text-center">
                    <div className="flex items-end justify-center gap-1">
                      <span className="text-3xl font-bold" style={{ color: "var(--leetsheet-success)" }}>{solved}</span>
                      <span className="text-base" style={{ color: "var(--leetsheet-text-secondary)" }}>/ {total}</span>
                    </div>
                    <p className="text-base" style={{ color: "var(--leetsheet-text-secondary)" }}>Solved</p>
                    
                  </div>
                </CircularProgressbarWithChildren>
                <p className="text-sm flex justify-center mt-3 " style={{ color: "var(--leetsheet-text-secondary)" }}>{attempting} Attempting</p>
              </div>
            </div>

            <div className="space-y-2">
              {difficultyStats.map((stat) => (
                <div key={stat.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {stat.name}
                    </span>
                    <span className="font-bold">{stat.solved}/{stat.total}</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: "var(--leetsheet-bg-tertiary)" }}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${(stat.solved / Math.max(stat.total, 1)) * 100}%`,
                        backgroundColor:
                          stat.name === "Easy"
                            ? "var(--leetsheet-success)"
                            : stat.name === "Medium"
                            ? "var(--leetsheet-warning)"
                            : "var(--leetsheet-error)",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Consolidated Performance Statistics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-leetsheet rounded-xl overflow-hidden">
            <div className="p-2 pb-5" style={{ borderBottom: "1px solid var(--leetsheet-border-primary)" }}>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Statistics
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Core Metrics */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: "var(--leetsheet-bg-secondary)" }}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full" style={{ backgroundColor: "var(--leetsheet-info)" }}>
                        <Code2 className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--leetsheet-text-secondary)" }}>Languages Used</p>
                        <p className="text-2xl font-bold">{languagesUsed.length}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs" style={{ color: "var(--leetsheet-text-secondary)" }}>Most Used:</p>
                      <p className="font-semibold" style={{ color: "var(--leetsheet-info)" }}>{mostUsedLanguage}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: "var(--leetsheet-bg-secondary)" }}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full" style={{ backgroundColor: "var(--leetsheet-success)" }}>
                        <Clock className="w-6 h-6"/>
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--leetsheet-text-secondary)" }}>Average Time</p>
                        <p className="text-2xl font-bold">{averageTime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs" style={{ color: "var(--leetsheet-text-secondary)" }}>Per Problem</p>
                      <div className="w-2 h-2 rounded-full mt-1" style={{ backgroundColor: "var(--leetsheet-success)" }}></div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Performance Metrics */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: "var(--leetsheet-bg-secondary)" }}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full" style={{ backgroundColor: "var(--leetsheet-orange)" }}>
                        <Activity className="w-6 h-6"/>
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--leetsheet-text-secondary)" }}>Total Submissions</p>
                        <p className="text-2xl font-bold">{totalSubmissions}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs" style={{ color: "var(--leetsheet-text-secondary)" }}>All Time</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" style={{ color: "var(--leetsheet-orange)" }} />
                        <span className="text-xs font-medium" style={{ color: "var(--leetsheet-orange)" }}>Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: "var(--leetsheet-bg-secondary)" }}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full" style={{ backgroundColor: "var(--leetsheet-orange)" }}>
                        <CheckCircle className="w-6 h-6" style={{ color: "var(--leetsheet-text-primary)" }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--leetsheet-text-secondary)" }}>Success Rate</p>
                        <p className="text-2xl font-bold">{successRate}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs" style={{ color: "var(--leetsheet-text-secondary)" }}>Overall</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1" style={{ width: "40px" }}>
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${successRate}%`, 
                            backgroundColor: "var(--leetsheet-orange)" 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Languages Section */}
              <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--leetsheet-border-primary)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="w-5 h-5" style={{ color: "var(--leetsheet-text-secondary)" }} />
                  <h4 className="font-semibold" style={{ color: "var(--leetsheet-text-primary)" }}>Programming Languages</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {languagesUsed.map((language, index) => {
                    const count = languageFrequency[language];
                    const percentage = totalSubmissions > 0 ? ((count / totalSubmissions) * 100).toFixed(1) : '0.0';
                    return (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg badge-leetsheet"
                        style={{ backgroundColor: "var(--leetsheet-bg-secondary)" }}
                      >
                        <span className="font-medium">{language}</span>
                        <span 
                          className="text-xs px-2 py-1 rounded-full" 
                          style={{ 
                            backgroundColor: "var(--leetsheet-orange)", 
                            color: "white",
                            opacity: "0.8"
                          }}
                        >
                          {count} ({percentage}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="card-leetsheet rounded-xl overflow-hidden">
        <div className="p-2 pb-5" style={{ borderBottom: "1px solid var(--leetsheet-border-primary)" }}>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Login Activity
          </h3>
        </div>
        <div className="p-6">
          <LoginHeatmap loginMap={isAdmin ? aggregatedLoginMap : loginMap} usersByDate={isAdmin ? usersByDate : undefined} />
        </div>
      </div>

      {/* Admin-only: Users Overview */}
      {isAdmin && (
        <div className="card-leetsheet rounded-xl overflow-hidden">
          <div className="p-2 pb-5" style={{ borderBottom: "1px solid var(--leetsheet-border-primary)" }}>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart2 className="w-5 h-5" />
              Users Overview
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Active Users (last 14 days)</h4>
                {isUsersLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader className="w-6 h-6 animate-spin" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {activeUsers.slice(0, 10).map((u) => (
                      <div key={u.id} className="flex items-center gap-3">
                        <img src={u.image || profile} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex-1">
                          <p className="font-medium">{u.name || u.email}</p>
                          <p className="text-xs" style={{ color: "var(--leetsheet-text-secondary)" }}>{u.email}</p>
                        </div>
                        {u.lastloginDate && (
                          <span className="text-xs" style={{ color: "var(--leetsheet-text-secondary)" }}>
                            {new Date(u.lastloginDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    ))}
                    {!activeUsers.length && (
                      <p className="text-sm" style={{ color: "var(--leetsheet-text-secondary)" }}>No active users in this period.</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-3">All Users</h4>
                {isUsersLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader className="w-6 h-6 animate-spin" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 max-h-96 overflow-auto pr-2">
                    {users.map((u) => (
                      <div key={u.id} className="flex items-center gap-3">
                        <img src={u.image || profile} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex-1">
                          <p className="font-medium flex items-center gap-2">
                            {u.name || u.email}
                            {u.role === "ADMIN" && (
                              <span className="px-1.5 py-0.5 text-[10px] rounded-full" style={{ backgroundColor: "#111827", color: "#f59e0b" }}>ADMIN</span>
                            )}
                          </p>
                          <p className="text-xs" style={{ color: "var(--leetsheet-text-secondary)" }}>{u.email}</p>
                        </div>
                        <span className="text-xs" style={{ color: "var(--leetsheet-text-secondary)" }}>
                          {new Date(u.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                    {!users.length && (
                      <p className="text-sm" style={{ color: "var(--leetsheet-text-secondary)" }}>No users found.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Solved Problems Table - hidden for admins */}
      {!isAdmin && (
        <div className="card-leetsheet rounded-xl overflow-hidden">
          <div className="p-2 pb-5" style={{ borderBottom: "1px solid var(--leetsheet-border-primary)" }}>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5" />
              Solved Problems ({solved})
            </h3>
          </div>
          <div className="p-6 rounded-xl">
            {isProblemsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden table-leetsheet">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Difficulty
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(solvedProblems || []).length ? (
                        (solvedProblems || []).map((problem) => (
                          <tr key={problem.id} className="transition-colors">
                            <td className="px-4 py-3">
                              <span className="font-medium hover:underline cursor-pointer transition-colors" style={{ color: "var(--leetsheet-text-primary)" }}>
                                {problem.title}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium badge-leetsheet ${
                                  problem.difficulty === "EASY"
                                    ? "success"
                                    : problem.difficulty === "MEDIUM"
                                    ? "warning"
                                    : "error"
                                }`}
                              >
                                {problem.difficulty}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium badge-leetsheet success">
                                ✓ Solved
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-medium" style={{ color: "var(--leetsheet-text-primary)" }}>
                                {new Date(
                                  problem.updatedAt || problem.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="text-center py-12"
                            style={{ color: "var(--leetsheet-text-secondary)" }}
                          >
                            <BookOpenCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">
                              No problems solved yet
                            </p>
                            <p className="text-sm">
                              Start solving problems to see them here!
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;