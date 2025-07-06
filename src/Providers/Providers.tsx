"use client";

import store from "@/redux/store";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster position="top-center" richColors />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
