import { Client, Account, TablesDB, Query } from 'appwrite';

// Appwrite endpoint + project ID are not secrets for the web SDK — they're
// meant to ship in the client bundle, so hardcoding them here (rather than
// behind an env var) is the standard Appwrite pattern.
export const APPWRITE_ENDPOINT = 'https://sgp.cloud.appwrite.io/v1';
export const APPWRITE_PROJECT_ID = '6a7eafe70004501c7bf7';
// The "Practice OS" database already exists in the console as a TablesDB
// (Appwrite's table/row model, not the older collections/documents model).
// Appwrite auto-generates the DB ID from creation, so it does NOT match the
// display name "practice_os" — this is the real ID from the console.
// Override via VITE_APPWRITE_DATABASE_ID if you ever recreate it under a different ID.
export const APPWRITE_DATABASE_ID = (import.meta.env.VITE_APPWRITE_DATABASE_ID as string) || '6a7ebc0000056a68c221';

export const TABLES = {
  REENGAGEMENT_LOG: 'reengagement_log',
  CALLS_LOG: 'calls_log',
  APPOINTMENTS: 'appointments',
  WAITLIST_OFFERS: 'waitlist_offers',
  PENDING_TREATMENTS: 'pending_treatments',
  RATINGS: 'ratings',
  CLAIMS: 'claims',
  REVENUE_RECOVERED: 'revenue_recovered',
  COMPLETED_VISITS: 'completed_visits',
  REMINDER_LOG: 'reminder_log',
} as const;
// Back-compat alias — earlier drafts of this file called these "collections".
export const COLLECTIONS = TABLES;

export const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export { Query };

/**
 * Fetches all rows in a table matching the given queries.
 * Used by every agent card — n8n writes here, the dashboard just reads.
 */
export async function listDocuments<T = Record<string, unknown>>(
  tableId: string,
  queries: string[] = []
): Promise<T[]> {
  const res = await tablesDB.listRows({ databaseId: APPWRITE_DATABASE_ID, tableId, queries });
  return res.rows as unknown as T[];
}

/** Start-of-today ISO string in the browser's local timezone, for "today" filters. */
export function startOfTodayISO(): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}
