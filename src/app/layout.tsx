import type { Metadata } from "next";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ReduxProviders } from "@/contexts/ReduxContext";
import CheckTurnOnConsole from "@/components/shared/checkTurnOnConsole";

export const metadata: Metadata = {
  title: "Nevself | Dành riêng cho chính bạn",
  description: "Biolink là một công cụ tạo trang cá nhân đơn giản.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans text-black">
        <ReduxProviders>
          <AuthContextProvider>
            {/* <CheckTurnOnConsole /> */}
            <main className="min-h-screen w-full flex flex-col items-center">
              {children}
            </main>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              theme="light"
              transition={Bounce}
            />
          </AuthContextProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}
