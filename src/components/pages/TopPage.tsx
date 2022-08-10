import type { FC } from 'react';

export const TopPage: FC = () => {
  return (
    <div>
      <h2>草</h2>
      <div className="flex gap-1">
        {Array.from({ length: 40 }).map((_, i) => {
          const key = i;

          return (
            <div key={key} className="flex flex-col gap-1">
              <div className="h-4 w-4 rounded border bg-green-300" />
              <div className="h-4 w-4 rounded border" />
              <div className="h-4 w-4 rounded border" />
              <div className="h-4 w-4 rounded border bg-green-300" />
              <div className="h-4 w-4 rounded border bg-green-300" />
              <div className="h-4 w-4 rounded border" />
              <div className="h-4 w-4 rounded border" />
            </div>
          );
        })}
      </div>
      <h2>post sticky</h2>
      <div>
        <input className="rounded border" type="text" />
        <button className="rounded border px-2" type="button">
          submit
        </button>
      </div>

      <h2>post task</h2>
      <div>
        <input className="rounded border" type="text" />
        <button className="rounded border px-2" type="button">
          submit
        </button>
      </div>
    </div>
  );
};
