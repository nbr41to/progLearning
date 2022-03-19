import { FC, ReactNode, useState } from "react";

type Props = {
  tipContent: string | ReactNode;
};

/* ButtonなどのLabelをこのComponentでWrapする */
export const ToolTip: FC<Props> = ({ children, tipContent }) => {
  const [activeToolTip, setActiveToolTip] = useState(false);

  let TooltipTimeout: NodeJS.Timeout;
  const showToolTip = () => {
    TooltipTimeout = setTimeout(() => {
      setActiveToolTip(true);
    }, 300);
  };

  const hideToolTip = () => {
    setActiveToolTip(false);
    clearInterval(TooltipTimeout);
  };

  return (
    <>
      <div
        className="w-fit"
        onMouseEnter={showToolTip}
        onMouseLeave={hideToolTip}
      >
        {/* Description */}
        {children}
        {activeToolTip && (
          <div className="absolute z-20 -mt-2 ml-2 rounded border bg-white py-4 px-2 text-sm text-slate-600">
            {tipContent}
          </div>
        )}
      </div>
    </>
  );
};
