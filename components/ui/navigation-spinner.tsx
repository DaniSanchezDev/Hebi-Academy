"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavigationSpinner() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsNavigating(true);
    };

    window.addEventListener("beforeunload", handleRouteChangeStart);

    return () => {
      window.removeEventListener("beforeunload", handleRouteChangeStart);
    };
  }, []);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  if (!isNavigating) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-indigo-100"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-violet-500 animate-spin"></div>
        </div>
        <p className="text-indigo-600 font-medium mt-2">Cargando...</p>
      </div>
    </div>
  );
}
