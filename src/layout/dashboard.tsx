import { AppShell, Navbar, Header } from '@mantine/core';
import  CustomHeader from './header';
import CustomNavbar from './navbar';

type PageProps = {
  children: React.ReactNode; // 👈️ type children
};

export default function DashboardLayout(props: PageProps) {
  
  return (
    <AppShell
      padding="md"
      navbar={<CustomNavbar/>}
      header={<CustomHeader/>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      { props.children }
    </AppShell>
  );
}