"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl, FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./FormCreateCourse.form"
import { z } from "zod"
import axios from 'axios'
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function FormCreateCourse() {
  const router = useRouter()
   // Definimos el formulario
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Definimos los valores del form por defecto
    defaultValues: {
      courseName: "",
      slug:""
    },
  })
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    try {
      const res = await axios.post("/api/course" , values)
      toast.success("Course created successfully!", {
        style: {
          background: 'hsl(210, 40%, 98%)',       // Fondo azul muy claro
          color: 'hsl(221.2, 83.2%, 36.3%)',     // Texto azul oscuro
          border: '1px solid hsl(214.3, 84.6%, 87.8%)', // Borde azul claro
          borderRadius: '0.5rem',
          padding: '1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        },
        icon: '🚀',  // O puedes usar '📘' para un ícono de libro
        duration: 4000,
        description: "You can now add content to your new course."
      });
      router.push(`/teacher/${res.data.id}`)
    } catch (error) {
      console.error(error)
      toast.error("Failed to create course. Please check your connection and try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="NextJs Course" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug course</FormLabel>
              <FormControl>
                <Input placeholder="nextjs-course" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}
