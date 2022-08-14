import { type PropsWithChildren } from 'react';
import clsx from 'clsx';

type AlertProps = { id: string; label?: string; className?: string } & PropsWithChildren;
function Alert({ id, label, className, children }: AlertProps) {
  return (
    <div
      className={clsx('py-2 px-4 text-sm rounded max-w-full overflow-hidden text-ellipsis', className)}
      role="alert"
      id={id}
    >
      {label ? <span className="font-semibold mr-1">{label}:</span> : null}
      {children}
    </div>
  );
}

export function AlertInfo({ className, ...props }: AlertProps) {
  return <Alert className={clsx('text-blue-700 bg-blue-100', className)} {...props} />;
}

export function AlertDanger({ className, ...props }: AlertProps) {
  return <Alert className={clsx('text-red-700 bg-red-100', className)} {...props} />;
}

export function AlertSuccess({ className, ...props }: AlertProps) {
  return <Alert className={clsx('text-green-700 bg-green-100', className)} {...props} />;
}
