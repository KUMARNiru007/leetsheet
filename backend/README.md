# Backend Configuration (Judge0)

This backend uses the Judge0 code execution API to run code submissions. For production-ready RapidAPI integration, configure the following environment variables in your `.env` file.

Required env variables

- JUDGE0_API_URL - the base URL for Judge0 RapidAPI (e.g., `https://judge0-ce.p.rapidapi.com`)
- JUDGE0_RAPIDAPI_HOST - the RapidAPI host header (e.g., `judge0-ce.p.rapidapi.com`)
- JUDGE0_RAPIDAPI_KEY - your RapidAPI key

Example `.env` entries:

```
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
# Some RapidAPI apps use a custom host (e.g. "default-application_11324607") — set the host accordingly:
# Example using default-application host:
# JUDGE0_RAPIDAPI_HOST=default-application_11324607.p.rapidapi.com
JUDGE0_RAPIDAPI_HOST=judge0-ce.p.rapidapi.com
JUDGE0_RAPIDAPI_KEY=YOUR_RAPIDAPI_KEY_HERE
```

Usage note

- The backend uses a configured axios client (`judge0Client`) in `src/libs/judge0.lib.js` and automatically sends the RapidAPI headers to the endpoints, so you should not need to add headers in each request.
- This library exposes:
  - `submitBatch(submissions)` - bulk submit test case batches
  - `pollBatchResults(tokens)` - poll batch results until all are done
  - `getSubmission(token, options)` - fetch a single submission by its token
  - `submitSingle(submission, opts)` - submit a single submission and (optionally) wait for results
  - `getLanguages()` - list available languages
  - `getLanguageById(id)` - get language details
  - `getConfigInfo()` - judge0 config
  - `getAbout()` - judge0 about info

Security

- Never commit the RapidAPI key to source control. Store it securely in secret managers in production.
- Rotate the API key if you suspect unauthorized access.

Production considerations

- Configure `JUDGE0_RETRIES`, `JUDGE0_BACKOFF_MS`, and `JUDGE0_TIMEOUT_MS` in `.env` to set retry/backoff and timeouts for the RapidAPI requests.
- RapidAPI enforces rate limits — make sure your plan can handle your expected QPS. Optionally add a rate limiter or queue to avoid overwhelming the API.
- Use a secret store or environment variable management for `JUDGE0_RAPIDAPI_KEY` in CI/CD and production; do not commit the key to the repository.
- Implement monitoring and alerts on high error rates or high 429 responses, which indicate throttling.
- For production, consider an in-process retry with exponential backoff (we implemented a basic one here). For stricter guarantees you may want a task queue (e.g., Redis queue) for long-running code execution and to avoid blocking web requests.

Testing

- To test locally, set the env vars and run the backend in dev mode:

```powershell
cd backend
npm run dev
```

- This will load env variables from `.env` and use the RapidAPI-provided Judge0 endpoints.
