import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="w-full flex flex-col items-center">{children}</div>
      <Footer />
    </>
  );
}
