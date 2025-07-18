import { Bot } from "lucide-react";
import { Button } from "./ui/button";

type HeaderProps = {
  onHistoryClick: () => void;
};

export default function Header({ onHistoryClick }: HeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Bot className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-foreground">
            PromptForge AI
          </h1>
        </div>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" onClick={onHistoryClick}>History</Button>
          <Button variant="ghost" disabled>Premium</Button>
        </nav>
      </div>
    </header>
  );
}
