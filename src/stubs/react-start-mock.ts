// Mock stub for @tanstack/react-start on the client SPA
export function createServerFn(options?: any) {
  const run = (args?: any) => {
    // Client-side fallback or runner
    return run;
  };
  run.validator = (v: any) => run;
  run.handler = (h: any) => run;
  return run;
}

export function createMiddleware() {
  return {
    server: () => ({})
  };
}

export function getRequestHeaders() {
  return {};
}
