import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

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
  } = useSubmissionStore();
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [customTestCases, setCustomTestCases] = useState([]);
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [activeResultTab, setActiveResultTab] = useState("testcases");
  const [cooldown, setCooldown] = useState(0);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  // New state for panel sizes
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [editorHeight, setEditorHeight] = useState(70);

  const { executeCode, submission, isExecuting, executionMode, resetExecutionMode } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  useEffect(() => {
    if (cooldown === 0) resetExecutionMode();
  }, [cooldown]);

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

      const allCases = problem.testcases || [];
      const sampleCases = allCases.filter((tc) => tc.isSample === true);
      setTestCases(
        (sampleCases.length > 0 ? sampleCases : allCases.slice(0, 3)).map((tc) => ({
          input: tc.input,
          output: tc.output,
          explanation: tc.explanation,
        }))
      );
      setCustomTestCases([]);
      setActiveTestCase(0);
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
      executeCode(code, language_id, id, "run", customTestCases);
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
      executeCode(code, language_id, id, "submit");
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

  const displayCases = [...testCases, ...customTestCases];
  const activeCaseIsCustom = activeTestCase >= testCases.length;

  const handleAddCustomCase = () => {
    if (customTestCases.length >= 5) return;
    const newIndex = displayCases.length;
    setCustomTestCases((prev) => [...prev, { input: "", output: "" }]);
    setActiveTestCase(newIndex);
  };

  const handleCustomCaseChange = (field, value) => {
    const customIndex = activeTestCase - testCases.length;
    if (customIndex < 0) return;
    setCustomTestCases((prev) =>
      prev.map((tc, i) => (i === customIndex ? { ...tc, [field]: value } : tc))
    );
  };

  const handleDeleteCustomCase = () => {
    const customIndex = activeTestCase - testCases.length;
    if (customIndex < 0) return;
    setCustomTestCases((prev) => prev.filter((_, i) => i !== customIndex));
    setActiveTestCase((prev) => Math.max(0, Math.min(prev, displayCases.length - 2)));
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
        <Link
          to="/"
          className="flex items-center hover:opacity-90 transition-all duration-300"
        >
          <div className="flex items-center perspective-[1000px]">
            <img
              src="/logo.webp"
              className="h-8 w-13 mt-1"
              alt="Logo"
            />
            <span
              className="text-[var(--leetsheet-text-primary)] font-bold text-xl tracking-wide  transition-transform duration-500 translate-x-[-10px]"
            >
              LeetSheet
            </span>
          </div>
        </Link>

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
            {isExecuting && executionMode === "run" ? (
              "Running..."
            ) : cooldown > 0 && executionMode === "run" ? (
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
            {isExecuting && executionMode === "submit" ? (
              "Submitting..."
            ) : cooldown > 0 && executionMode === "submit" ? (
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
            className={`rounded-md px-2 py-1 text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
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
            className="rounded-md px-2 py-1 text-xs font-medium flex items-center gap-1 hover:bg-zinc-700 transition-all cursor-pointer"
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
      <div className="flex-1 flex overflow-hidden">
        {/* Problem Description Section - Scrollable content */}
        <div 
          className="flex flex-col p-2 shadow-lg overflow-hidden relative" 
          style={{ 
            backgroundColor: 'var(--leetsheet-bg-primary)',
            width: `${leftPanelWidth}%`
          }}
        >
          {/* Tab navigation - Fixed */}
          <div className="flex-shrink-0 relative flex justify-between mb-2 border-b pb-1 w-full" style={{ borderColor: 'var(--leetsheet-border-primary)' }}>
            {["description", "submissions", "discussion", "hints"].map(
              (tab) => {
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
                    className={`relative flex-1 text-xs text-center font-medium py-1 transition-colors duration-300 cursor-pointer`}
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
                      {Object.entries(problem.examples).map(([, ex], idx) => (
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

          {/* Vertical resize handle */}
          <div
            className="w-1 cursor-col-resize absolute right-0 top-0 bottom-0 z-10 "style={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.9)'}}
            onMouseDown={(e) => {
              e.preventDefault();
              const startX = e.clientX;
              const startWidth = leftPanelWidth;
              
              const onMouseMove = (e) => {
                const delta = ((e.clientX - startX) / window.innerWidth) * 100;
                const newWidth = Math.min(Math.max(30, startWidth + delta), 70);
                setLeftPanelWidth(newWidth);
              };
              
              const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
              };
              
              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', onMouseUp);
            }}
          />
        </div>

        {/* Right Side - Code Editor and Test Cases/Results */}
        <div 
          className="flex flex-col overflow-hidden relative"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          {/* Code Editor Section */}
          <div 
            className="flex flex-col overflow-hidden shadow-lg relative" 
            style={{ 
              backgroundColor: 'var(--leetsheet-bg-primary)',
              height: `${editorHeight}%`
            }}
          >
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
            <div className="flex-1 w-full">
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

            {/* Horizontal resize handle */}
            <div
              className="h-1 cursor-row-resize absolute bottom-0 left-0 right-0 z-10"
              style={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.9)'}}
              onMouseDown={(e) => {
                e.preventDefault();
                const startY = e.clientY;
                const startHeight = editorHeight;
                
                const onMouseMove = (e) => {
                  const delta = ((e.clientY - startY) / window.innerHeight) * 100;
                  const newHeight = Math.min(Math.max(30, startHeight + delta), 85);
                  setEditorHeight(newHeight);
                };
                
                const onMouseUp = () => {
                  document.removeEventListener('mousemove', onMouseMove);
                  document.removeEventListener('mouseup', onMouseUp);
                };
                
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
              }}
            />
          </div>
          
          {/* Test Cases/Results Section */}
          <div 
            className="flex-shrink-0 flex flex-col rounded-lg shadow-lg" 
            style={{ 
              backgroundColor: 'var(--leetsheet-bg-primary)',
              height: `${100 - editorHeight}%`
            }}
          >
            {/* Stylish Tab  */}
            <div className="flex-shrink-0 px-2 py-2 relative" style={{ 
              background: 'var(--leetsheet-bg-secondary)'
            }}>
              <div className="flex gap-2">
                {[
                  { key: "testcases", label: "Test Cases", icon: Code2 },
                  { key: "results", label: "Results", icon: CheckCircle },
                ].map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveResultTab(tab.key)}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-300 flex items-center gap-1 ${
                      activeResultTab === tab.key
                        ? "shadow-md transform scale-105"
                        : "hover:scale-102"
                    }`}
                    style={{
                      backgroundColor: activeResultTab === tab.key 
                        ? 'var(--leetsheet-orange)' 
                        : 'var(--leetsheet-bg-elevated)',
                      color: activeResultTab === tab.key 
                        ? 'var(--leetsheet-bg-primary)' 
                        : 'var(--leetsheet-text-primary)'
                    }}
                  >
                    <TabIcon className="w-3 h-3" />
                    {tab.label}
                  </button>
                  );
                })}
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
                      {displayCases.map((_, idx) => (
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
                      <button
                        onClick={handleAddCustomCase}
                        disabled={customTestCases.length >= 5}
                        className="px-2 py-1 rounded-md text-xs font-semibold transition-all duration-200 flex items-center gap-1 hover:scale-102 disabled:opacity-40 disabled:hover:scale-100 border border-dashed"
                        style={{
                          backgroundColor: 'var(--leetsheet-bg-tertiary)',
                          color: 'var(--leetsheet-orange)',
                          borderColor: 'var(--leetsheet-border-accent)'
                        }}
                      >
                        <Plus className="w-3 h-3" /> Add Case
                      </button>
                    </div>
                    <div className="text-xs flex items-center flex-shrink-0" style={{ color: 'var(--leetsheet-text-muted)' }}>
                      {displayCases.length} test{displayCases.length !== 1 ? "s" : ""}
                    </div>
                  </div>

                  {/* Enhanced Test Case Display */}
                  {displayCases[activeTestCase] && (
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
                        {activeCaseIsCustom ? (
                          <textarea
                            value={displayCases[activeTestCase].input}
                            onChange={(e) => handleCustomCaseChange("input", e.target.value)}
                            spellCheck={false}
                            className="input-leetsheet font-mono text-xs resize-y"
                            rows={3}
                            placeholder="Enter custom input e.g. 3&#10;2 3 1"
                          />
                        ) : (
                          <div className="p-2 rounded-md border transition-colors" style={{
                            backgroundColor: 'var(--leetsheet-bg-secondary)',
                            borderColor: 'var(--leetsheet-bg-tertiary)'
                          }}>
                            <code className="font-mono text-xs break-all" style={{ color: 'var(--leetsheet-text-primary)' }}>
                              {displayCases[activeTestCase]?.input}
                            </code>
                          </div>
                        )}
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
                        {activeCaseIsCustom ? (
                          <textarea
                            value={displayCases[activeTestCase].output}
                            onChange={(e) => handleCustomCaseChange("output", e.target.value)}
                            spellCheck={false}
                            className="input-leetsheet font-mono text-xs resize-y"
                            rows={3}
                            placeholder="Enter expected output e.g. 6"
                          />
                        ) : (
                          <div className=" p-2 rounded-md border transition-colors" style={{
                            backgroundColor: 'var(--leetsheet-bg-secondary)',
                            borderColor: 'var(--leetsheet-bg-tertiary)'
                          }}>
                            <code className="font-mono text-xs break-all" style={{ color: 'var(--leetsheet-text-primary)' }}>
                              {displayCases[activeTestCase]?.output}
                            </code>
                          </div>
                        )}
                      </div>

                      {/* Explanation Section - samples only */}
                      {!activeCaseIsCustom && displayCases[activeTestCase]?.explanation && (
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
                              {displayCases[activeTestCase].explanation}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Delete custom case */}
                      {activeCaseIsCustom && (
                        <div className="flex items-center justify-end pt-1">
                          <button
                            onClick={handleDeleteCustomCase}
                            className="px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 border transition-all duration-200 hover:scale-102"
                            style={{
                              color: 'var(--leetsheet-error)',
                              borderColor: 'rgba(255, 77, 79, 0.35)',
                              backgroundColor: 'var(--leetsheet-bg-tertiary)'
                            }}
                          >
                            <Trash2 className="w-3 h-3" /> Delete Case
                          </button>
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