import React, { useState } from 'react';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { runJob } from '../lib/automation';

interface RunButtonProps {
  job: string;
  label: string;
  className: string;
}

/**
 * A button that actually does something: POSTs to the automation service's
 * /run/:job endpoint and shows real loading/success/failure states.
 *
 * Every "Run Campaign"-style button on the dashboard used to be decorative —
 * clicking it did nothing, which is worse than not having the button at all
 * for a paying customer. This makes the click real.
 */
export function RunButton({ job, label, className }: RunButtonProps) {
  const [state, setState] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setState('running');
    setMessage(null);
    const result = await runJob(job);
    setState(result.ok ? 'done' : 'error');
    setMessage(result.message);
    setTimeout(() => setState('idle'), 3000);
  };

  return (
    <div className="mt-auto">
      <button
        onClick={handleClick}
        disabled={state === 'running'}
        className={`w-full py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-wait ${className}`}
      >
        {state === 'running' && <Loader2 size={13} className="animate-spin" />}
        {state === 'done' && <Check size={13} />}
        {state === 'error' && <AlertCircle size={13} />}
        <span>
          {state === 'running' ? 'Running…' : state === 'done' ? 'Done' : state === 'error' ? 'Failed' : label}
        </span>
      </button>
      {state === 'error' && message && (
        <p className="text-[10px] text-rose-400 mt-1.5 text-center leading-snug">{message}</p>
      )}
    </div>
  );
}
