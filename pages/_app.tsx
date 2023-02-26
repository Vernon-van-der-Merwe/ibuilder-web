import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { AuthContextProvider } from '@/src/context/authContext';
import { NotificationsProvider } from '@mantine/notifications';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/src/config/protectedRoutes';
import DashboardLayout from '@/src/layout/dashboard';

const noAuthRequired = ["/auth/login", "/auth/signup"];


export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <AuthContextProvider>
          <NotificationsProvider position="top-center">
            {noAuthRequired.includes(router.pathname) ? (
              <Component {...pageProps} />
            ) : (
              <ProtectedRoute>
                <DashboardLayout>
                  <Component {...pageProps} />
                </DashboardLayout>
              </ProtectedRoute>
            )}
          </NotificationsProvider>
        </AuthContextProvider>
      </MantineProvider>
    </>
  );
}
