import React, { useState } from 'react';
import { Search, Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCollection } from '../../lib/useCollection';
import { COLLECTIONS, Query } from '../../lib/appwrite';
import { importPatients, ImportedPatient } from '../../lib/automation';

interface PatientRow {
  $id: string;
  name: string;
  phone: string;
  last_visit_date?: string;
  last_treatment?: string;
  status: string;
}

/** Splits pasted rows on tab or comma (whichever the first line actually uses) and maps
 *  columns by header name when present, falling back to a fixed column order otherwise. */
function parsePatientText(text: string): { patients: ImportedPatient[]; skipped: number } {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return { patients: [], skipped: 0 };

  const delimiter = lines[0].includes('\t') ? '\t' : ',';
  const cells = (line: string) => line.split(delimiter).map((c) => c.trim());

  const headerCells = cells(lines[0]).map((c) => c.toLowerCase().replace(/[^a-z]/g, ''));
  const known = ['name', 'phone', 'lastvisitdate', 'lastvisit', 'lasttreatment', 'status'];
  const hasHeader = headerCells.some((c) => known.includes(c));

  const colIndex = (keys: string[]) => headerCells.findIndex((c) => keys.includes(c));
  const idx = hasHeader
    ? {
        name: colIndex(['name']),
        phone: colIndex(['phone']),
        lastVisit: colIndex(['lastvisitdate', 'lastvisit']),
        lastTreatment: colIndex(['lasttreatment']),
        status: colIndex(['status']),
      }
    : { name: 0, phone: 1, lastVisit: 2, lastTreatment: 3, status: 4 };

  const dataLines = hasHeader ? lines.slice(1) : lines;
  const patients: ImportedPatient[] = [];
  let skipped = 0;

  for (const line of dataLines) {
    const row = cells(line);
    const name = idx.name >= 0 ? row[idx.name] : '';
    const phone = idx.phone >= 0 ? row[idx.phone] : '';
    if (!name || !phone) {
      skipped++;
      continue;
    }
    patients.push({
      name,
      phone,
      last_visit_date: idx.lastVisit >= 0 ? row[idx.lastVisit] : undefined,
      last_treatment: idx.lastTreatment >= 0 ? row[idx.lastTreatment] : undefined,
      status: (idx.status >= 0 ? row[idx.status] : '') || 'active',
    });
  }

  return { patients, skipped };
}

export function PatientsView() {
  const { data: patients, loading, error } = useCollection<PatientRow>(COLLECTIONS.PATIENTS, [
    Query.orderDesc('$id'),
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pasteText, setPasteText] = useState('');
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const handleImport = async () => {
    const { patients: parsed, skipped } = parsePatientText(pasteText);
    if (parsed.length === 0) {
      setResult({ ok: false, message: 'No valid rows found — each needs at least a name and phone number.' });
      return;
    }

    setImporting(true);
    setResult(null);
    const res = await importPatients(parsed);
    setImporting(false);

    if (!res.ok) {
      setResult({ ok: false, message: res.message || 'Import failed.' });
      return;
    }

    const skippedNote = skipped > 0 ? ` (${skipped} row${skipped > 1 ? 's' : ''} skipped — missing name or phone)` : '';
    const failedNote = res.errors.length > 0 ? ` — ${res.errors.length} failed to save` : '';
    setResult({ ok: true, message: `Imported ${res.imported} of ${res.total} patients${skippedNote}${failedNote}.` });
    setPasteText('');
  };

  const filtered = patients.filter((p) =>
    `${p.name} ${p.phone}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col space-y-6">
      <div>
        <h2 className="font-display italic text-2xl md:text-[28px] text-[var(--ink)] leading-snug">
          Every patient the Re-Engagement Agent knows about.
        </h2>
        <p className="text-sm text-[var(--ink-muted)] mt-1.5 max-w-2xl">
          Paste a list below to add or update patients. Once they're here, "Run Campaign Now" on the Today page will reach anyone lapsed 6+ months.
        </p>
      </div>

      {/* Import */}
      <div className="bg-[var(--surface)] border border-[var(--hairline)] rounded-2xl p-5 space-y-3">
        <label className="text-xs font-medium uppercase tracking-wider text-[var(--ink-muted)]">
          Paste patient rows (name, phone, last visit date, last treatment, status)
        </label>
        <textarea
          value={pasteText}
          onChange={(e) => setPasteText(e.target.value)}
          placeholder={'Rahul Sharma\t+919810000001\t2025-02-14\tCleaning\tactive\nPriya Verma\t+919810000002\t2024-06-20\tFilling\tactive'}
          rows={5}
          className="w-full bg-[var(--surface-soft)] border border-[var(--hairline)] rounded-xl px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 focus:outline-none resize-y font-mono"
        />
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {result ? (
            <div className={`text-xs flex items-center gap-1.5 ${result.ok ? 'text-[var(--brand)]' : 'text-rose-600'}`}>
              {result.ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              {result.message}
            </div>
          ) : <span />}
          <button
            onClick={handleImport}
            disabled={importing || !pasteText.trim()}
            className="flex items-center gap-2 bg-[var(--brand)] hover:opacity-90 disabled:opacity-40 text-white px-4 py-2 rounded-lg text-sm font-medium transition-opacity shrink-0"
          >
            {importing ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
            {importing ? 'Importing…' : 'Import Patients'}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="bg-[var(--surface)] border border-[var(--hairline)] rounded-2xl flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[var(--hairline)] flex justify-between items-center">
          <div>
            <h3 className="text-sm font-semibold text-[var(--ink)]">Patient Directory</h3>
            <p className="text-xs text-[var(--ink-muted)] mt-0.5">
              {loading ? 'Loading…' : `${patients.length} patient${patients.length === 1 ? '' : 's'} on file`}
            </p>
          </div>
          <div className="flex items-center bg-[var(--surface-soft)] rounded-lg px-3 py-1.5 border border-[var(--hairline)] w-64">
            <Search size={14} className="text-[var(--ink-muted)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients..."
              className="bg-transparent border-none outline-none text-sm text-[var(--ink)] ml-2 w-full placeholder:text-[var(--ink-muted)]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {error && (
            <p className="p-6 text-sm text-rose-600">Couldn't load patients: {error}</p>
          )}
          {!error && !loading && patients.length === 0 && (
            <p className="p-6 text-sm text-[var(--ink-muted)]">
              No patients yet — paste a list above to get started.
            </p>
          )}
          {!error && filtered.length > 0 && (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[var(--surface-soft)] text-[var(--ink-muted)] text-xs uppercase tracking-wider sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 font-medium">Patient</th>
                  <th className="px-6 py-3 font-medium">Phone</th>
                  <th className="px-6 py-3 font-medium">Last Visit</th>
                  <th className="px-6 py-3 font-medium">Last Treatment</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--hairline)] text-[var(--ink)]">
                {filtered.map((p) => (
                  <tr key={p.$id} className="hover:bg-[var(--surface-soft)] transition-colors">
                    <td className="px-6 py-3 font-medium">{p.name}</td>
                    <td className="px-6 py-3 text-[var(--ink-muted)] font-mono text-xs">{p.phone}</td>
                    <td className="px-6 py-3 text-[var(--ink-muted)]">{p.last_visit_date || '—'}</td>
                    <td className="px-6 py-3 text-[var(--ink-muted)]">{p.last_treatment || '—'}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        p.status === 'active' ? 'bg-[var(--brand)]/10 text-[var(--brand)]' : 'bg-[var(--ink-muted)]/10 text-[var(--ink-muted)]'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
