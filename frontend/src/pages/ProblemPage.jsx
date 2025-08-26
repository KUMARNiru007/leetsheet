import React, { useState, useEffect } from "react";
import { useParams, Link, useFetcher } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  Lightbulb,
  Bookmark,
  Share2,
  BookOpen,
  Code2,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Code,
  Send,
  CloudUpload,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { useProblemStore } from "../store/useProblemStore.js";
import { useExecutionStore } from "../store/useExecutionStore.js";
import { getLanguageId } from "../lib/lang.js";
import { useSubmissionStore } from "../store/useSubmissionStore.js";
import SubmissionResults from "../components/Submission.jsx";
import SubmissionList from "../components/SubmissionList.jsx";
import AddtoPlaylist from "../components/AddtoPlaylist.jsx";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [activeResultTab, setActiveResultTab] = useState("testcases");
  const [cooldown, setCooldown] = useState(0);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const { executeCode, submission, isExecuting, clearSubmission } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  const startCooldown = () => {
    setCooldown(30);
  };

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (problem) {
      const availableLanguages = Object.keys(problem.codeSnippets || {});
      const defaultLanguage = availableLanguages.includes("JAVASCRIPT")
        ? "JAVASCRIPT"
        : availableLanguages[0] || "JAVASCRIPT";

      if (
        !code &&
        selectedLanguage === "JAVASCRIPT" &&
        !availableLanguages.includes("JAVASCRIPT")
      ) {
        setSelectedLanguage(defaultLanguage);
      }

      const currentCode = problem.codeSnippets?.[selectedLanguage] || "";
      setCode(currentCode);

      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (problem && !code) {
      const availableLanguages = Object.keys(problem.codeSnippets || {});
      if (availableLanguages.includes("JAVASCRIPT")) {
        setSelectedLanguage("JAVASCRIPT");
      } else if (availableLanguages.length > 0) {
        setSelectedLanguage(availableLanguages[0]);
      }
    }
  }, [problem]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  useEffect(() => {
    return () => {
      setActiveResultTab("testcases");
      setSelectedSubmission(null);
      useExecutionStore.getState().clearSubmission();
    };
  }, [id]);

  useEffect(() => {
    if (submission) {
      setActiveResultTab("results");
    }
  }, [submission]);

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    setCode(problem.codeSnippets?.[language] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    if (cooldown > 0) return;

    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);

      executeCode(code, language_id, stdin, expected_outputs, id, false);
      startCooldown();
    } catch (error) {
      console.log("Error running code: ", error);
    }
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    if (cooldown > 0) return;

    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);

      executeCode(code, language_id, stdin, expected_outputs, id, true);
      startCooldown();
    } catch (error) {
      console.log("Error submitting code: ", error);
    }
  };

  const handleBookmark = (problemId) => {
    setSelectedProblemId(problemId);
    console.log("Selected Problem: ", selectedProblemId);
    setIsAddToPlaylistModalOpen(true);
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.log("Failed to copy url: ", error);
      toast.error("Failed to copy url");
    }
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="h-screen w-screen flex items-center justify-center" style={{ backgroundColor: 'var(--leetsheet-bg-primary)' }}>
        <span className="loading loading-spinner loading-md" style={{ color: 'var(--leetsheet-orange)' }}></span>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--leetsheet-bg-primary)', color: 'var(--leetsheet-text-primary)' }}>
      {/* Navigation - Fixed height */}
      <nav className="flex-shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center py-1 px-2 border-b" style={{ borderColor: 'var(--leetsheet-border-primary)' }}>
        {/* Problem Title */}
        <div className="flex items-center gap-2">
          {/* Logo (Left) */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src="/leetsheet.svg"
              className="h-7 w-7 border px-1 py-1 rounded-full"
              style={{ 
                backgroundColor: 'var(--leetsheet-orange)/20',
                color: 'var(--leetsheet-orange)',
                borderColor: 'var(--leetsheet-orange)/30'
              }}
              alt="Logo"
            />
          </Link>
          <span className="text-lg md:text-xl font-bold tracking-tight text-[var(--leetsheet-text-primary)] hidden md:block">
            LeetSheet
          </span>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={handleRunCode}
            className="btn btn-base px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all"
            style={{
              backgroundColor: '',
              color: 'var(--leetsheet-orange)',
              borderColor: 'var(--leetsheet-border-accent)'
            }}
            disabled={isExecuting || cooldown > 0}
          >
            {isExecuting ? (
              "Running..."
            ) : cooldown > 0 ? (
              `Wait ${cooldown}s`
            ) : (
              <>
                <Play className="w-4 h-3" />
                Run Code
              </>
            )}
          </button>
          <button
            onClick={handleSubmitCode}
            className="btn btn-base px-4 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all"
            style={{
              backgroundColor: 'var(--leetsheet-submit)/80',
              color: 'var(--leetsheet-submit)',
              borderColor: 'var(--leetsheet-submit)'
            }}
            disabled={isExecuting || cooldown > 0}
          >
            {isExecuting ? (
              "Submitting..."
            ) : cooldown > 0 ? (
              `Wait ${cooldown}s`
            ) : (
              <>
                <CloudUpload className="w-4 h-4" /> Submit
              </>
            )}
          </button>
        </div>

        {/* Right Options */}
        <div className="flex flex-wrap items-center gap-1">
          {/* Bookmark Button */}
          <button
            onClick={() => {
              handleBookmark(problem.id);
              setIsBookmarked(!isBookmarked);
            }}
            className={`rounded-md px-2 py-1 text-xs font-medium flex items-center gap-1 transition-all ${
              isBookmarked
                ? "border"
                : "hover:bg-zinc-700 border border-transparent"
            }`}
            style={{
              backgroundColor: isBookmarked ? 'var(--leetsheet-warning)/20' : 'transparent',
              color: isBookmarked ? 'var(--leetsheet-warning)' : 'var(--leetsheet-text-secondary)',
              borderColor: isBookmarked ? 'var(--leetsheet-warning)' : 'transparent'
            }}
          >
            <Bookmark className="w-3 h-3" />
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="rounded-md px-2 py-1 text-xs font-medium flex items-center gap-1 hover:bg-zinc-700 transition-all"
            style={{ 
              color: 'var(--leetsheet-text-secondary)',
              backgroundColor: 'transparent'
            }}
          >
            <Share2 className="w-3 h-3" />
            Share
          </button>
        </div>
      </nav>

      {/* Main content area - Takes remaining height */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Problem Description Section - Scrollable content */}
        <div className="flex flex-col p-2 shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--leetsheet-bg-primary)' }}>
          {/* Tab navigation - Fixed */}
          <div className="flex-shrink-0 relative flex justify-between mb-2 border-b pb-1 w-full" style={{ borderColor: 'var(--leetsheet-border-primary)' }}>
            {["description", "submissions", "discussion", "hints"].map(
              (tab, index) => {
                const Icon =
                  tab === "description"
                    ? FileText
                    : tab === "submissions"
                    ? Code2
                    : tab === "discussion"
                    ? BookOpen
                    : Lightbulb;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative flex-1 text-xs text-center font-medium py-1 transition-colors duration-300`}
                    style={{
                      color: activeTab === tab ? 'var(--leetsheet-orange)' : 'var(--leetsheet-text-secondary)'
                    }}
                  >
                    <div className="flex justify-center items-center gap-1">
                      <Icon className="w-3 h-3" />
                      <span className="uppercase">{tab}</span>
                    </div>
                  </button>
                );
              }
            )}

            {/* Bubble underline */}
            <div
              className="absolute bottom-0 h-0.5 rounded-full transition-all duration-300"
              style={{
                width: "25%",
                backgroundColor: 'var(--leetsheet-orange)',
                transform: `translateX(${
                  ["description", "submissions", "discussion", "hints"].indexOf(
                    activeTab
                  ) * 100
                }%)`,
              }}
            />
          </div>

          {/* Tab content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-2 rounded-none">
            {activeTab === "description" && (
              <div className="prose prose-invert max-w-none space-y-3">
                {/* Title */}
                <h1
                  className="text-2xl font-bold tracking-wide mb-2 leading-tight"
                  style={{ color: "var(--leetsheet-text-primary)" }}
                >
                  {problem.title}
                </h1>

                {/* Description */}
                <div>
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ color: "var(--leetsheet-text-primary)" }}
                  >
                    Description
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--leetsheet-text-primary)" }}
                  >
                    {problem.description}
                  </p>
                </div>

                {/* Examples */}
                {problem.examples && (
                  <div>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--leetsheet-text-primary)" }}
                    >
                      Examples
                    </h3>

                    <div className="space-y-2">
                      {Object.entries(problem.examples).map(([lang, ex], idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-md space-y-1"
                          style={{ backgroundColor: "var(--leetsheet-bg-secondary)" }}
                        >
                          <p
                            className="text-sm leading-snug"
                            style={{ color: "var(--leetsheet-text-primary)" }}
                          >
                            <strong>Input:</strong>{" "}
                            <code className="px-1 py-0.5 rounded text-xs" style={{ color: "var(--leetsheet-code-text)" }}>
                              {ex.input}
                            </code>
                          </p>

                          <p
                            className="text-sm leading-snug"
                            style={{ color: "var(--leetsheet-text-primary)" }}
                          >
                            <strong>Output:</strong>{" "}
                            <code className="px-1 py-0.5 rounded text-xs" style={{ color: "var(--leetsheet-code-text)" }}>
                              {ex.output}
                            </code>
                          </p>

                          {ex.explanation && (
                            <p
                              className="text-xs leading-relaxed"
                              style={{ color: "var(--leetsheet-text-primary)" }}
                            >
                              <strong>Explanation:</strong> {ex.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Constraints */}
                {problem.constraints && (
                  <div>
                    <h3
                      className="text-lg font-semibold mb-1"
                      style={{ color: "var(--leetsheet-text-primary)" }}
                    >
                      Constraints
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--leetsheet-text-primary)" }}
                    >
                      <code className="block px-2 py-1 rounded text-xs" style={{ color: "var(--leetsheet-code-text)" }}>
                        {problem.constraints}
                      </code>
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "submissions" && (
              <SubmissionList
                submissions={submissions}
                isLoading={isSubmissionsLoading}
                onSubmissionSelect={(submission) => {
                  setSelectedSubmission(submission);
                  setActiveResultTab("results");
                }}
              />
            )}

            {activeTab === "discussion" && (
              <div className="p-2 text-center text-sm" style={{ color: 'var(--leetsheet-text-muted)' }}>
                No discussions yet
              </div>
            )}

            {activeTab === "hints" && (
              <div className="p-2">
                {problem?.hints ? (
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--leetsheet-bg-tertiary)' }}>
                    <span className="px-2 py-1 rounded-md font-semibold text-sm" style={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      color: 'var(--leetsheet-text-primary)'
                    }}>
                      {problem.hints}
                    </span>
                  </div>
                ) : (
                  <div className="text-center text-sm" style={{ color: 'var(--leetsheet-text-muted)' }}>
                    No hints available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Code Editor and Test Cases/Results */}
        <div className="flex flex-col overflow-hidden">
          {/* Code Editor Section */}
          <div className="flex-1 flex flex-col overflow-hidden shadow-lg" style={{ backgroundColor: 'var(--leetsheet-bg-primary)' }}>
            {/* Editor Header - Fixed */}
            <div className="flex-shrink-0 px-2 py-1 flex justify-between items-center border-b" style={{ 
              backgroundColor: 'var(--leetsheet-bg-primary)',
              borderColor: 'var(--leetsheet-bg-tertiary)'
            }}>
              <h2 className="text-sm font-semibold flex items-center gap-1" style={{ color: 'var(--leetsheet-text-primary)' }}>
                <Code className="w-4 h-4" /> Code Editor
              </h2>
              
              {/* Language Selector  */}
              <div className=" min-w-[100px]">
                <select
            className=" w-full select-bordered text-xs px-2 py-1 rounded-md border cursor-pointer focus:outline-none  " style={{
                    backgroundColor: 'var(--leetsheet-bg-secondary)',
                    borderColor: 'var(--leetsheet-border-primary)',
                    color: 'var(--leetsheet-text-primary)'
                  }}
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.keys(problem.codeSnippets || {}).map((lang) => (
              <option key={lang} value={lang} 
              style={{
                        backgroundColor: 'var(--leetsheet-bg-secondary)',
                        color: 'var(--leetsheet-text-primary)'
                      }}>
                {lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()}
                
              </option>
            ))}
          </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                  <svg className="w-3 h-3" style={{ color: 'var(--leetsheet-text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Editor - Takes available space */}
            <div className="h-[1200px] w-full">
              <Editor
                height="100%"
                language={selectedLanguage.toLowerCase()}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                    minimap: { enabled: false },
                    fontSize: 15,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
              />
            </div>
          </div>
          
          {/* Test Cases/Results Section - Fixed height */}
          <div className="flex-shrink-0 h-80 flex flex-col rounded-lg shadow-lg" style={{ backgroundColor: 'var(--leetsheet-bg-primary)' }}>
            {/* Stylish Tab  */}
            <div className="flex-shrink-0 px-2 py-2 relative" style={{ 
              background: 'var(--leetsheet-bg-secondary)'
            }}>
              <div className="flex gap-2">
                {[
                  { key: "testcases", label: "Test Cases", icon: Code2 },
                  { key: "results", label: "Results", icon: CheckCircle },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveResultTab(key)}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-300 flex items-center gap-1 ${
                      activeResultTab === key
                        ? "shadow-md transform scale-105"
                        : "hover:scale-102"
                    }`}
                    style={{
                      backgroundColor: activeResultTab === key 
                        ? 'var(--leetsheet-orange)' 
                        : 'var(--leetsheet-bg-elevated)',
                      color: activeResultTab === key 
                        ? 'var(--leetsheet-bg-primary)' 
                        : 'var(--leetsheet-text-primary)'
                    }}
                  >
                    <Icon className="w-3 h-3" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area - Scrollable */}
            <div className="flex-1 p-2 overflow-y-auto">
              {activeResultTab === "results" ? (
                (submission || selectedSubmission) ? (
                  <div className="h-full">
                    <SubmissionResults submission={submission || selectedSubmission} />
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center text-sm" style={{ color: 'var(--leetsheet-text-muted)' }}>
                    <p>Please run or submit the code first to see results.</p>
                  </div>
                )
              ) : (
                <div className="h-full flex flex-col">
                  {/* Enhanced Test Case Selector */}
                  <div className="flex gap-1 mb-2 pb-2  flex-shrink-0" style={{ borderColor: 'var(--leetsheet-border-primary)'}}>
                    <div className="flex gap-2 flex-wrap flex-1">
                      {testCases.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveTestCase(idx)}
                          className={`px-2 py-1 rounded-md text-xs font-semibold transition-all duration-200 flex items-center gap-1 ${
                            activeTestCase === idx
                              ? "shadow-sm transform scale-105"
                              : "hover:scale-102"
                          }`}
                          style={{
                            backgroundColor: activeTestCase === idx
                              ? 'var(--leetsheet-orange)'
                              : 'var(--leetsheet-bg-tertiary)',
                            color: activeTestCase === idx
                              ? 'var(--leetsheet-bg-primary)'
                              : 'var(--leetsheet-text-primary)'
                          }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: activeTestCase === idx
                                ? 'rgba(0, 0, 0, 0.3)'
                                : 'rgba(255, 255, 255, 0.5)'
                            }}
                          />
                          Case {idx + 1}
                        </button>
                      ))}
                    </div>
                    <div className="text-xs flex items-center flex-shrink-0" style={{ color: 'var(--leetsheet-text-muted)' }}>
                      {testCases.length} test{testCases.length !== 1 ? "s" : ""}
                    </div>
                  </div>

                  {/* Enhanced Test Case Display */}
                  {testCases[activeTestCase] && (
                    <div className="flex-1 rounded-lg p-2 space-y-2 border overflow-y-auto" style={{
                      background: 'var(--leetsheet-bg-primary)',
                      borderColor: 'var(--leetsheet-bg-tertiary)'
                    }}>
                      {/* Input Section */}
                      <div className="group">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--leetsheet-success)/20' }}>
                            <ArrowRight className="w-3 h-3" style={{ color: 'var(--leetsheet-success)' }} />
                          </div>
                          <span className="font-semibold text-xs p-2" style={{ color: 'var(--leetsheet-success)' }}>
                            Input
                          </span>
                        </div>
                        <div className="p-2 rounded-md border transition-colors" style={{
                          backgroundColor: 'var(--leetsheet-bg-secondary)',
                          borderColor: 'var(--leetsheet-bg-tertiary)'
                        }}>
                          <code className="font-mono text-xs break-all" style={{ color: 'var(--leetsheet-text-primary)' }}>
                            {testCases[activeTestCase]?.input}
                          </code>
                        </div>
                      </div>

                      {/* Output Section */}
                      <div className="group">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--leetsheet-info)/20' }}>
                            <CheckCircle className="w-4 h-4" style={{ color: 'var(--leetsheet-info)' }} />
                          </div>
                          <span className="font-semibold text-xs p-2" style={{ color: 'var(--leetsheet-info)' }}>
                            Expected Output
                          </span>
                        </div>
                        <div className=" p-2 rounded-md border transition-colors" style={{
                          backgroundColor: 'var(--leetsheet-bg-secondary)',
                          borderColor: 'var(--leetsheet-bg-tertiary)'
                        }}>
                          <code className="font-mono text-xs break-all" style={{ color: 'var(--leetsheet-text-primary)' }}>
                            {testCases[activeTestCase]?.output}
                          </code>
                        </div>
                      </div>

                      {/* Explanation Section */}
                      {testCases[activeTestCase]?.explanation && (
                        <div className="group">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--leetsheet-warning)/20' }}>
                              <Lightbulb className="w-2 h-2" style={{ color: 'var(--leetsheet-warning)' }} />
                            </div>
                            <span className="font-semibold text-xs" style={{ color: 'var(--leetsheet-warning)' }}>
                              Explanation
                            </span>
                          </div>
                          <div className="p-2 rounded-md border transition-colors" style={{
                            backgroundColor: 'var(--leetsheet-bg-secondary)/80',
                            borderColor: 'var(--leetsheet-warning)/20'
                          }}>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--leetsheet-text-primary)' }}>
                              {testCases[activeTestCase].explanation}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <AddtoPlaylist
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </div>
  );
};

export default ProblemPage;