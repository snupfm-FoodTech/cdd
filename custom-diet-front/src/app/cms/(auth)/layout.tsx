interface ClientAuthLayoutProps {
    children: React.ReactNode;
  }
  
  export default function ClientAuthLayout({ children }: ClientAuthLayoutProps) {
    return (
      <main className="h-screen flex-1 overflow-hidden bg-background">
        {children}
      </main>
    );
  }
  