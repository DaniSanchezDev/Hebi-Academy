"use client"
import { LogIn, Search, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Hook personalizado para debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

type Course = {
  id: string;
  title: string;
  slug: string;
  imageURL: string | null;
  price: string | null;
  category: string | null;
};

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Manejar clics fuera del componente de búsqueda para cerrar los resultados
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Buscar cursos cuando cambia el término de búsqueda (con debounce)
  useEffect(() => {
    const fetchCourses = async () => {
      if (!debouncedSearch) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(`/api/search?query=${encodeURIComponent(debouncedSearch)}`);
        setSearchResults(response.data.courses);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleCourseSelect = (slug: string) => {
    router.push(`/courses/${slug}`);
    handleClearSearch();
  };
  
  return (
    <div className="sticky top-0 z-30 flex justify-between items-center px-4 h-16 border-b border-white/10 bg-gradient-to-r from-indigo-900/80 to-violet-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-indigo-900/60">
      <SidebarTrigger className="text-white hover:text-indigo-200 transition-colors" />

      <div className="flex gap-3 items-center">
        <div ref={searchRef} className="relative">
          <div className="flex w-full max-w-sm items-center bg-white/10 border border-white/20 rounded-lg px-2.5 py-1">
            <Search className="h-4 w-4 text-indigo-200 mr-2.5" />
            <Input
              type="search"
              placeholder="Buscar cursos"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowResults(true)}
              className="w-full border-0 bg-transparent text-white placeholder:text-indigo-200/70 focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:ring-offset-0"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4 text-white/70" />
              </button>
            )}
          </div>
          
          {/* Resultados de búsqueda */}
          {showResults && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 w-full bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl shadow-lg border border-indigo-100 overflow-hidden z-50">
              {isLoading ? (
                <div className="p-4 text-center text-indigo-800">
                  <div className="animate-pulse">Buscando cursos...</div>
                </div>
              ) : searchResults.length > 0 ? (
                <ul className="max-h-[350px] overflow-y-auto">
                  {searchResults.map((course) => (
                    <li key={course.id}>
                      <button
                        className="w-full text-left p-3 hover:bg-indigo-100 transition-all duration-200 border-b border-indigo-100 flex items-center gap-3"
                        onClick={() => handleCourseSelect(course.slug)}
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                          {course.imageURL ? (
                            <Image
                              src={course.imageURL}
                              alt={course.title}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          ) : (
                            <div className="text-indigo-500 font-bold text-xl">{course.title[0]}</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-indigo-900 font-medium line-clamp-1">{course.title}</h4>
                          <div className="flex items-center justify-between mt-1">
                            {course.category && (
                              <span className="text-xs text-indigo-600 bg-indigo-100/50 px-2 py-0.5 rounded">
                                {course.category}
                              </span>
                            )}
                            {course.price && (
                              <span className="text-sm font-medium text-indigo-800">
                                {course.price}€
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : searchQuery ? (
                <div className="p-4 text-center text-indigo-800">
                  No se encontraron cursos para &ldquo;{searchQuery}&rdquo;
                </div>
              ) : null}
              
              {searchResults.length > 0 && (
                <div className="p-2 bg-gradient-to-br from-indigo-100 to-violet-100 border-t border-indigo-200">
                  <Link 
                    href={`/courses?search=${encodeURIComponent(searchQuery)}`}
                    className="block w-full text-center text-sm text-indigo-700 hover:text-indigo-900 font-medium py-1"
                    onClick={() => setShowResults(false)}
                  >
                    Ver todos los resultados
                  </Link>
                </div>
              )}
            </div>
          )}

        </div>

        <SignedOut>
          <SignInButton>
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors">
              <LogIn className="mr-2 h-4 w-4" /> 
              Log in
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
