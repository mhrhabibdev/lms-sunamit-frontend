"use client";

import store, { persistor } from "@/redux/store";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-center" richColors />
          {children}
        </ThemeProvider>
      </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
