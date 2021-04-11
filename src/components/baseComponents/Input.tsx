import classNames from "classnames";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

const Input = (
  { className, ...props }: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <input
      className={classNames(
        className,
        "px-4 py-2 border border-gray-600 rounded"
      )}
      ref={ref}
      {...props}
    />
  );
};
export default forwardRef(Input);
