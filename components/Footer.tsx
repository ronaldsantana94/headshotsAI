export default function Footer() {
  return (
    <footer className="text-center px-4 py-6 w-full border-t border-border bg-background text-muted-foreground text-sm">
      © {new Date().getFullYear()} <span className="font-semibold text-foreground">HeadshotsAI</span>. All rights reserved.
    </footer>
  );
}