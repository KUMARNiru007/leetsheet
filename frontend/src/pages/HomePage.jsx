import React, { useEffect, useState } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { 
  Code, 
  Trophy, 
  Target, 
  Users, 
  TrendingUp, 
  Play,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  Zap,
  BarChart3,
  Bell,
  ListTodo,
  GitBranch,
  Shield,
  Monitor,
  Database,
  Cloud
} from "lucide-react";
import ProblemsTable from "../components/ProblemTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  const { problems, getAllProblems, isProblemsLoading } = useProblemStore();
  const { authUser } = useAuthStore();
  const [stats, setStats] = useState({
    totalProblems: 0,
    solvedProblems: 0,
    totalUsers: 0,
    successRate: 0
  });

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  useEffect(() => {
    if (problems.length > 0) {
      const totalProblems = problems.length;
      const solvedProblems = problems.filter(p => 
        p.solvedBy.some(user => user.userId === authUser?.id)
      ).length;
      
      setStats({
        totalProblems,
        solvedProblems,
        totalUsers: Math.floor(Math.random() * 1000) + 500,
        successRate: Math.floor((solvedProblems / totalProblems) * 100) || 0
      });
    }
  }, [problems, authUser]);

  const featuredProblems = problems.slice(0, 3);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "EASY": return "text-green-500 bg-green-100";
      case "MEDIUM": return "text-yellow-600 bg-yellow-100";
      case "HARD": return "text-red-500 bg-red-100";
      default: return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            One platform to master
            <span className="block text-yellow-500">coding challenges</span>
            and your skills
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Solve real-world programming problems, track your progress with advanced analytics, 
            and join a community of developers building the future one algorithm at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            {!authUser ? (
              <Link
                to="/signup"
                className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Start for Free
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
              </Link>
            )}
            <button className="bg-white text-green-500 border-2 border-green-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-all duration-300 hover:shadow-lg">
              Get a Demo
            </button>
          </div>

          {/* Floating Avatars */}
          <div className="relative">
            <div className="flex justify-center items-center space-x-8">
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-bounce group-hover:scale-110 transition-transform duration-300">
                  JD
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
              
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-bounce group-hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.2s'}}>
                  SM
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
              
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-bounce group-hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.4s'}}>
                  AL
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
              
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-bounce group-hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.6s'}}>
                  RK
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-lg mb-8">More than 100+ companies trust LeetLab</p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-2xl font-bold text-gray-400 hover:opacity-80 transition-opacity cursor-pointer">Google</div>
            <div className="text-2xl font-bold text-gray-400 hover:opacity-80 transition-opacity cursor-pointer">Microsoft</div>
            <div className="text-2xl font-bold text-gray-400 hover:opacity-80 transition-opacity cursor-pointer">Amazon</div>
            <div className="text-2xl font-bold text-gray-400 hover:opacity-80 transition-opacity cursor-pointer">Meta</div>
            <div className="text-2xl font-bold text-gray-400 hover:opacity-80 transition-opacity cursor-pointer">Netflix</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-4">
              FEATURES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest advanced technologies to ensure everything you need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maximize your team's productivity and security with our affordable, user-friendly coding platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Dynamic Dashboard */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Dynamic Dashboard</h3>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                  <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                  <div className="w-8 h-8 bg-purple-400 rounded-full"></div>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Real-time progress tracking with interactive charts and personalized insights.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                </div>
                <button className="text-green-500 font-medium hover:text-green-600 transition-colors">
                  Explore all
                </button>
              </div>
            </div>

            {/* Smart Notifications */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Smart Notifications</h3>
              <p className="text-gray-600 mb-6">
                Stay updated with intelligent alerts and personalized reminders.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Email notifications</span>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Social updates</span>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Announcements</span>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Reminders</span>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Management */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Task Management</h3>
              <p className="text-gray-600 mb-6">
                Organize your coding sessions and track daily achievements.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">Solved 3 problems today</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    SM
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sarah Miller</p>
                    <p className="text-xs text-gray-500">Completed daily streak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-24 bg-[#2F4F4F] relative">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
            INTEGRATIONS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Don't replace. Integrate.
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect LeetLab with your favorite development tools and platforms for seamless workflow.
          </p>
          <button className="text-white font-medium hover:text-green-400 transition-colors mb-12">
            All Integrations →
          </button>
          
          <div className="grid grid-cols-6 gap-6">
            {[
              { name: 'GitHub', icon: GitBranch },
              { name: 'VS Code', icon: Code },
              { name: 'Slack', icon: Bell },
              { name: 'Discord', icon: Bell },
              { name: 'Notion', icon: Database },
              { name: 'Jira', icon: ListTodo },
              { name: 'AWS', icon: Cloud },
              { name: 'Docker', icon: Shield },
              { name: 'Postman', icon: Zap },
              { name: 'Figma', icon: Monitor },
              { name: 'Linear', icon: ListTodo },
              { name: 'Vercel', icon: Cloud }
            ].map((tool, index) => (
              <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                <tool.icon className="w-8 h-8 text-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl text-gray-300 mb-8">"</div>
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
            LeetLab transformed how I approach coding challenges. The structured learning path and 
            real-time feedback helped me land my dream job at a top tech company.
          </blockquote>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              DR
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">David Rodriguez</p>
              <p className="text-gray-600">Senior Software Engineer at Google</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">2023</div>
              <p className="text-gray-600">LeetLab Founded</p>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">1K+</div>
              <p className="text-gray-600">Company Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-24 bg-[#2F4F4F] relative">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-white text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Discover the full scale of <span className="text-green-400">LeetLab</span> capabilities
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-green-600 border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-all duration-300 hover:shadow-lg">
              Get a Demo
            </button>
            {!authUser ? (
              <Link
                to="/signup"
                className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-all duration-300 hover:shadow-lg text-center"
              >
                Start for Free
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-all duration-300 hover:shadow-lg text-center"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Problems Section - Only show if user is authenticated */}
      {authUser && (
        <>
          {/* Featured Problems Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Featured Problems
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Start your coding journey with these carefully selected problems designed to build your skills progressively.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {featuredProblems.map((problem, index) => (
                  <div key={problem.id} className="bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">4.8</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {problem.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {problem.tags?.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>15 min</span>
                        </div>
                        <Link
                          to={`/problem/${problem.id}`}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Solve
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Link
                  to="/problems"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  View All Problems
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          {/* Problems Table Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  All Problems
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Browse through our comprehensive collection of coding challenges and start solving.
                </p>
              </div>
              
              {isProblemsLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
              ) : (
                <ProblemsTable problems={problems} />
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
