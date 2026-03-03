"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Loader2, Save, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

// Importamos los componentes para el selector de precio
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Importamos toast para las notificaciones
import { toast } from "sonner";

interface FormData {
  title: string;
  description: string;
  price: string;
  isPublished: boolean;
}

export default function AdminEditCoursePage() {
  const router = useRouter();
  const { courseId } = useParams();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "Free",
    isPublished: false,
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        const course = response.data;
        
        // Convertir el precio numérico a una de las opciones predefinidas
        let priceOption = "Free";
        if (course.price >= 59.99) priceOption = "59,99";
        else if (course.price >= 37.99) priceOption = "37,99";
        else if (course.price >= 25.99) priceOption = "25,99";
        else if (course.price >= 13.99) priceOption = "13,99";
        else if (course.price > 0) priceOption = "13,99";
        
        setFormData({
          title: course.title,
          description: course.description || "",
          price: priceOption,
          isPublished: course.isPublished || false,
        });
      } catch (error) {
        console.error("Error fetching course:", error);
        toast("Failed to load course data", {
        icon: <XCircle className="h-4 w-4 text-red-600" />,
        style: {
          background: '#FEF2F2',
          color: '#B91C1C',
          border: '1px solid #FECACA',
          borderRadius: '0.5rem',
        }
      });
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" 
        ? (e.target as HTMLInputElement).checked 
        : value
    }));
  };
  
  // Función para manejar cambio en el selector de precio
  const handlePriceChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      price: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      
      // Convertir el precio de string a número para la API
      const priceValue = formData.price === "Free" ? 0 : 
        parseFloat(formData.price.replace(",", "."));
        
      await axios.patch(`/api/courses/${courseId}`, {
        ...formData,
        price: priceValue
      });
      
      toast("Course updated successfully", {
        icon: <CheckCircle className="h-4 w-4 text-green-600" />,
        style: {
          background: '#F0FDF4',
          color: '#166534',
          border: '1px solid #BBF7D0',
          borderRadius: '0.5rem',
        }
      });
      router.push("/admin/courses");
    } catch (error) {
      console.error("Error updating course:", error);
      toast("Failed to update course", {
        icon: <XCircle className="h-4 w-4 text-red-600" />,
        style: {
          background: '#FEF2F2',
          color: '#B91C1C',
          border: '1px solid #FECACA',
          borderRadius: '0.5rem',
        }
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin h-10 w-10 text-indigo-600" />
          <p className="text-sm text-muted-foreground">Loading course information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-10">
        <Link 
          href="/admin/courses"
          className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:transform group-hover:-translate-x-1 transition-transform" />
          Back to courses
        </Link>
      </div>
      
      <div className="bg-card text-card-foreground shadow-xl overflow-hidden rounded-xl border border-border/40 backdrop-blur-sm bg-gradient-to-br from-indigo-50/5 via-card to-indigo-100/10 dark:from-indigo-950/20 dark:to-card">
        <div className="px-7 py-7 border-b border-border bg-gradient-to-r from-indigo-100/20 to-card dark:from-indigo-900/20">
          <h2 className="text-2xl font-semibold text-foreground">
            Edit Course
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Update course details as administrator
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="px-7 py-8 space-y-10">
          <div className="space-y-8">

            <div>
              <label htmlFor="title" className="block text-base font-medium text-foreground mb-1.5">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-2 block w-full bg-input/10 border-input rounded-lg shadow-sm p-3 focus:ring-[color:var(--chart-1)] focus:border-indigo-500 focus:shadow-[0_0_0_2px_rgba(var(--chart-1)/10%)] transition-all duration-200 text-sm"
              />
            </div>
            

            <div>
              <label htmlFor="description" className="block text-base font-medium text-foreground mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-2 block w-full bg-input/10 border-input rounded-lg shadow-sm p-3 focus:ring-[color:var(--chart-1)] focus:border-indigo-500 focus:shadow-[0_0_0_2px_rgba(var(--chart-1)/10%)] transition-all duration-200 text-sm"
              />
            </div>
            


            

            <div>
              <label htmlFor="price" className="block text-base font-medium text-foreground mb-1.5">
                Price (€)
              </label>
              <Select 
                value={formData.price} 
                onValueChange={handlePriceChange}
              >
                <SelectTrigger className="mt-2 bg-input/10 border-input rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.1)] transition-all duration-200 text-sm">
                  <SelectValue placeholder="Select a price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Price</SelectLabel>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="13,99">13,99€</SelectItem>
                    <SelectItem value="25,99">25,99€</SelectItem>
                    <SelectItem value="37,99">37,99€</SelectItem>
                    <SelectItem value="59,99">59,99€</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            

            <div className="flex items-center mt-4 space-x-3 bg-muted/20 p-4 rounded-lg border border-border/30">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                className="h-5 w-5 text-indigo-600 border-input rounded focus:ring-[color:var(--chart-1)] bg-input/10 transition-colors duration-200"
              />
              <div>
                <label htmlFor="isPublished" className="block text-base font-medium text-foreground">
                  Published
                </label>
                <p className="text-xs text-muted-foreground mt-0.5">Make this course available to students</p>
              </div>
            </div>
            
          </div>

          <div className="px-7 py-6 sm:flex sm:flex-row-reverse bg-gradient-to-r from-indigo-100/20 to-card dark:from-indigo-900/20 border-t border-border/40">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-lg px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-base font-medium text-white hover:from-indigo-700 hover:to-indigo-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 sm:ml-4 sm:w-auto"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Save Changes
                </>
              )}
            </button>
            <Link
              href="/admin/courses"
              className="mt-4 w-full inline-flex justify-center items-center rounded-lg border border-border shadow-md px-6 py-3 bg-card text-base font-medium text-foreground hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 sm:mt-0 sm:ml-3 sm:w-auto"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
