import ClientFooter from "@/components/layout/client/client-footer";

interface DietManagementSidebarLayoutProps {
  children: React.ReactNode;
}

const DietManagementLayout = ({
  children
}: DietManagementSidebarLayoutProps) => {
  return (
    <div>
      {children}
      <ClientFooter />
    </div>
  );
};

export default DietManagementLayout;
