import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  submission: null,

  executeCode: async (
    sourceCode,
    language_id,
    stdin,
    expectedOutputs,
    problemId,
    store
  ) => {
    try {
      set({ isExecuting: true });
      console.log(
        "SUbmission Data: ",
        JSON.stringify({
          sourceCode,
          language_id,
          stdin,
          expectedOutputs,
          problemId,
          store,
        })
      );

      const response = await axiosInstance.post("/execute-code", {
        source_code: sourceCode,
        language_id,
        stdin,
        expected_outputs: expectedOutputs,
        problemId,
        store,
      });

      set({ submission: response.data.submission });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error while executing code: ", error);
      toast.error("Error while executing code");
    } finally {
      set({ isExecuting: false });
    }
  },

  clearSubmission: () => set({ submission: null }),
}));
