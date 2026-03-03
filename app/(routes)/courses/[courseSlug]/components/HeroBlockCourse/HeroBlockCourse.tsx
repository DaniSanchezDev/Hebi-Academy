"use client";
import { useRouter } from "next/navigation";
import { HeroBlockCourseProps } from "./HeroBlockCourse.types";
import { useState } from "react";
import { IconBadge } from "@/components/Shared";
import { Calendar1Icon, ChartNoAxesColumn, Timer } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

export function HeroBlockCourse(props: HeroBlockCourseProps) {
  const { course, purchaseCourse } = props;

  const {
    id,
    title,
    level,
    updatedAt,
    slug,
    chapters,
    description,
    imageURL,
    price,
  } = course;

  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const enrollCourse = async () => {
    setIsLoading(true);
   if(price === "Free") {
      try {
        await axios.post(`/api/course/${id}/enroll`)
        toast.success("Successfully subscribed to the course!", {
          style: {
            background: 'hsl(143, 61%, 93%)',
            color: 'hsl(141, 71%, 48%)',
            border: '1px solid hsl(141, 71%, 73%)',
            borderRadius: '0.5rem',
            padding: '1rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }
        })  
        router.push(`/courses/${slug}/${chapters[0].id}`)
        
      } catch (error) {

        console.log(error);
        toast.error("Error subscribing to the course", {
          style: {
            background: 'hsl(0, 100%, 80%)',
            color: 'hsl(0, 100%, 20%)',
            border: '1px solid hsl(0, 100%, 70%)',
            borderRadius: '0.5rem',
            padding: '1rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }
        })
        
      } finally {
        setIsLoading(true)
      }
   } else {
    try {
      const response = await axios.post(`/api/course/${id}/checkout`)

      // Redireccionar a la url de stripe para el pago
      window.location.assign(response.data.url)
      
    } catch (error) {
      console.log(error);
      toast.error("Error checking out in the course", {
        style: {
          background: 'hsl(0, 100%, 80%)',
          color: 'hsl(0, 100%, 20%)',
          border: '1px solid hsl(0, 100%, 70%)',
          borderRadius: '0.5rem',
          padding: '1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }
      })
            
    } finally {
      setIsLoading(false)
    }
    
   }
   
  }

  const redirectToCourse  = () => {
    router.push(`/courses/${slug}/${chapters[0].id}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 p-6 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl shadow-md border border-indigo-100">
      <div className="space-y-4">
        <h2 className="text-4xl font-semibold text-indigo-900">{title}</h2>
        <p className="text-indigo-700 mt-3 text-lg">{description}</p>

        <div className="flex flex-col gap-4 mt-6 text-indigo-800 bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
          <IconBadge 
            icon={Timer} 
            text="12 horas" 
            className="text-indigo-700"
          />
          <IconBadge
            icon={Calendar1Icon}
            text={`Last update: ${new Date(updatedAt).toLocaleDateString(
              "es-ES"
            )}`}
            className="text-indigo-700"
          />
          <IconBadge
            icon={ChartNoAxesColumn}
            text={level || ""}
            className="text-indigo-700"
          />
        </div>
        <h2 className="text-2xl font-semibold my-4 text-indigo-900">{formatPrice(price)}</h2>

        {purchaseCourse ? (
          <Button
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            disabled={isLoading}
            onClick={redirectToCourse}
          >
            See course
          </Button>
        ) : (
          <Button
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            disabled={isLoading}
            onClick={enrollCourse}
          >
            Subscribe
          </Button>
        )}
      </div>
      <div className="flex items-center justify-center">
        <Image 
          src={imageURL || "/default-image.jpg"} 
          alt={title} 
          width={500} 
          height={350} 
          className="rounded-lg shadow-lg border-2 border-indigo-100 object-cover"
        />
      </div>
    </div>
  );
}
