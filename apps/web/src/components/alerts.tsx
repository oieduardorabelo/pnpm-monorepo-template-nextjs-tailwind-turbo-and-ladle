import { type PropsWithChildren } from 'react';
import clsx from 'clsx';

type AlertProps = { id: string; label?: string; className?: string } & PropsWithChildren;
function Alert({ id, label, className, children }: AlertProps) {
  return (
    <div
      className={clsx('max-w-full overflow-hidden text-ellipsis rounded py-2 px-4 text-sm', className)}
      role="alert"
      id={id}
    >
      {label ? <span className="mr-1 font-semibold">{label}:</span> : null}
      {children}
    </div>
  );
}

export function AlertInfo({ className, ...props }: AlertProps) {
  return <Alert className={clsx('bg-blue-100 text-blue-700', className)} {...props} />;
}

export function AlertDanger({ className, ...props }: AlertProps) {
  return <Alert className={clsx('bg-red-100 text-red-700', className)} {...props} />;
}

export function AlertSuccess({ className, ...props }: AlertProps) {
  return <Alert className={clsx('bg-green-100 text-green-700', className)} {...props} />;
}
