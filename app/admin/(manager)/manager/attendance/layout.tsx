import {
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider delay={150}>
      {children}
    </TooltipProvider>
  );
}