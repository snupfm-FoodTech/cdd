import { CustomerSupportNav } from '@/app/(client)/(root)/customer-support/components/navbar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function CustomerSupportLayout({ children }: ClientLayoutProps) {
  return (
    <section>
      <CustomerSupportNav />
      {children}
    </section>
  );
}
