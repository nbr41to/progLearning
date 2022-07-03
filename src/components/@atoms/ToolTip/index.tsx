import clsx from "clsx";
import { FC, ReactNode, useState } from "react";

type Props = {
  tipContent: string | ReactNode;
  disabled?: boolean;
  children: ReactNode;
};

/* ButtonなどのLabelをこのComponentでWrapする */
export const ToolTip: FC<Props> = ({
  children,
  tipContent,
  disabled = false,
}) => {
  const [activeToolTip, setActiveToolTip] = useState(false);

  let TooltipTimeout: NodeJS.Timeout;
  const showToolTip = () => {
    if (disabled) return;
    TooltipTimeout = setTimeout(() => {
      setActiveToolTip(true);
    }, 400);

    setTimeout(() => {
      setActiveToolTip(false);
    }, 2000);
  };

  const hideToolTip = () => {
    setActiveToolTip(false);
    clearInterval(TooltipTimeout);
  };

  return (
    <>
      <div
        className="relative"
        onMouseEnter={showToolTip}
        onMouseLeave={hideToolTip}
      >
        {/* Description */}
        {children}
        {activeToolTip && (
          <div
            className={clsx(
              "absolute z-20 -mt-2 ml-2 rounded border bg-white py-4 px-2 text-sm text-slate-600"
            )}
          >
            {tipContent}
          </div>
        )}
      </div>
    </>
  );
};
