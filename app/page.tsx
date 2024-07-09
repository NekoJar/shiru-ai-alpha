import Dashboard from "@/components/Dashboard";
import { Footer } from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Dashboard />
      <Footer />
    </main>
  );
}
