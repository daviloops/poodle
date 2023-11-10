'use client';

import { ReactNode } from "react";
import { SessionProvider } from 'next-auth/react';

import { CssVarsProvider } from '@mui/joy/styles';

import AuthProvider from "@/providers/AuthProvider";
import theme from '@/utils/theme';

const Providers = ({ children, session }: { children: ReactNode }) => {
  return (
    <CssVarsProvider theme={theme}>
      <SessionProvider session={session}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </SessionProvider>
    </CssVarsProvider>
  );
};

export default Providers;
