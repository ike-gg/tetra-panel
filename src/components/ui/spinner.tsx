import "../../styles/spinner.css";
import { cn } from "~/lib/utils";
interface Props {
  className?: string;
}

export const Spinner = ({ className }: Props) => {
  return (
    <div className={cn("size-4", className)}>
      <div className={"relative left-1/2 top-1/2 size-full"}>
        <div className="spinner_bar bg-neutral-500"></div>
        <div className="spinner_bar bg-neutral-500"></div>
        <div className="spinner_bar bg-neutral-500"></div>
        <div className="spinner_bar bg-neutral-500"></div>
        <div className="spinner_bar bg-neutral-500"></div>
        <div className="spinner_bar bg-neutral-500"></div>
        <div className="spinner_bar bg-neutral-500"></div>
        <div className="spinner_bar bg-neutral-500"></div>
        <div className="spinner_bar bg-neutral-500"></div>
        <div className="spinner_bar bg-neutral-500"></div>
        <div className="spinner_bar bg-neutral-500"></div>
        <div className="spinner_bar bg-neutral-500"></div>
      </div>
    </div>
  );
};
