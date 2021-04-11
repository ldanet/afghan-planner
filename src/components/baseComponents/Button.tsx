import classNames from "classnames";
import { ForwardedRef, forwardRef, ButtonHTMLAttributes } from "react";

const Button = (
  { className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  return (
    <button
      className={classNames(
        className,
        "px-3 py-1 bg-red-100 bg-opacity-50 border-red-300 border focus:ring-offset-red-600 hover:bg-red-100 rounded"
      )}
      ref={ref}
      {...props}
    />
  );
};
export default forwardRef(Button);
