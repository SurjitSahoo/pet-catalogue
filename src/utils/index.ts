import { AriaRole, HTMLAttributes, KeyboardEvent, MouseEvent } from 'react';

interface OnClickProps {
  role: AriaRole;
  fn?: (e?: MouseEvent) => void;
  onKeyPress?: string | string[];
}
export function a11yOnClick({ role, fn, onKeyPress }: OnClickProps): HTMLAttributes<HTMLSpanElement | HTMLDivElement> {
  const defaultKey = 'Enter';

  let keys: string[] = [];
  if (Array.isArray(onKeyPress)) {
    keys = keys.concat(onKeyPress);
  } else if (typeof onKeyPress === 'string') {
    keys.push(onKeyPress);
  }

  if (!keys.includes(defaultKey)) {
    keys.push(defaultKey); // default key;
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (keys.includes(event.key) && fn) {
      fn();
    }
  };
  return { role, tabIndex: 0, onKeyDown, onClick: fn } as const;
}

export default function betterFetch(input: RequestInfo, init?: RequestInit): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(input, init)
      .then(res => {
        if (res.ok) {
          resolve(res.json());
        } else {
          reject(res);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
