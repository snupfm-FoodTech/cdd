interface ClientAuthLayoutProps {
  children: React.ReactNode;
}

export default function ClientAuthLayout({ children }: ClientAuthLayoutProps) {
  return <main>{children}</main>;
}
