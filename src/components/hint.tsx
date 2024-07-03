import { 
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "./ui/tooltip"

export interface HintProps {
    label: string;
    children: React.ReactNode,
    side?: "left" | "top" | "bottom" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
}

const Hint = ({
    children,
    label,
    align,
    alignOffset,
    sideOffset,
    side
}: HintProps) => {
  return (
    <TooltipProvider>
        <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent
                className="text-white bg-black border-black"
                side={side}
                align={align}
                sideOffset={sideOffset}
                alignOffset={alignOffset}
            >
                <p className="font-semibold capitalize">
                    {label}
                </p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default Hint