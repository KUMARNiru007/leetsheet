import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "sonner";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  submission: null,

  executeCode: async (sourceCode, language_id, problemId, mode) => {
    try {
      set({ isExecuting: true });

      const response = await axiosInstance.post(
        mode === "submit" ? "/execute-code/submit" : "/execute-code/run",
        {
          source_code: sourceCode,
          language_id,
          problemId,
        }
      );

      set({ submission: response.data.submission });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error while executing code: ", error);
      toast.error(error?.response?.data?.error || "Error while executing code");
    } finally {
      set({ isExecuting: false });
    }
  },

  clearSubmission: () => set({ submission: null }),
}));