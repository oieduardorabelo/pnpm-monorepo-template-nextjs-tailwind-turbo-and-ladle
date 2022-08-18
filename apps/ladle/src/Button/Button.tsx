import clsx from "clsx";
import { PropsWithChildren } from "react";

// prettier-ignore
const BUTTON_STYLES = {
  default:     "bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  alternative: "border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700",
  dark:        "bg-gray-800 font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
  light:       "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
  green:       "bg-green-700 text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
  red:         "bg-red-700 text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
  yellow:      "bg-yellow-400 text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900",
  purple:      "bg-purple-700 text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",
};
// prettier-ignore
const BUTTON_SIZES = {
  xsmall: "rounded-md py-2 px-3 text-xs",
  small:  "rounded-md py-2 px-3 text-sm",
  base:   "rounded-md px-5 py-2.5 text-base",
  large:  "rounded-md py-3 px-5 text-lg",
  xlarge: "rounded-md px-6 py-3.5 text-xl",
};

type ButtonProps = {
  variant?: keyof typeof BUTTON_STYLES;
  size?: keyof typeof BUTTON_SIZES;
  type?: "button" | "submit";
};
export const Button = ({
  children,
  type = "button",
  variant = "default",
  size = "small",
}: PropsWithChildren<ButtonProps>) => (
  <button className={clsx(BUTTON_STYLES[variant], BUTTON_SIZES[size])} type={type}>
    {children}
  </button>
);
