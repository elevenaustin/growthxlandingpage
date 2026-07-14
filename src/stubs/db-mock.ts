// Client-safe mock stub for database functions
export async function getStore() {
  return { leads: [], status: { maintenance: false } };
}

export async function writeStore() {
  return true;
}
