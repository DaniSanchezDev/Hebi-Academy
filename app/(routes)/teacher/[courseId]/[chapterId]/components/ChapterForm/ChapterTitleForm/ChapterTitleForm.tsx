"use client"
import { ChapterTitleFormProps } from "./ChapterTitleForm.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./ChapterTitleForm.form";
import { EditorDescription } from "@/components/Shared";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



export function ChapterTitleForm(props: ChapterTitleFormProps) {
  const { chapter, courseId } = props;
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
       title: chapter.title || "",
       description:chapter.description || "",
       isFree: chapter.isFree || false
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    try {
      await axios.patch(`/api/course/${courseId}/chapter/${chapter.id}`, {
        title: values.title,
        description: values.description,
        isFree: values.isFree
      })

      toast.success("Chapter updated successfully!", {
        style: {
          background: 'hsl(143, 61%, 93%)',       
          color: 'hsl(141, 71%, 48%)',           
          border: '1px solid hsl(141, 71%, 73%)', 
          borderRadius: '0.5rem',
          padding: '1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        },
        duration: 4000
      });
      router.refresh()
      router.back()
    

    } catch (error) {
      console.log(error);
      toast.error("Error updating chapter", {
        style: {
          background: 'hsl(0, 100%, 80%)',       
          color: 'hsl(0, 100%, 20%)',          
          border: '1px solid hsl(0, 100%, 70%)',
          borderRadius: '0.5rem',
          padding: '1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        },
        duration: 4000
      });
      
    }
  };

  return (
    <div className="p-8 rounded-xl mt-6 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Chapter Details</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chapter name */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Chapter name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Introduction to the course..." 
                      className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Chapter description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-gray-700 font-medium">Chapter Description</FormLabel>
                  <FormControl>
                    <div className="bg-white rounded-md border border-gray-300 p-2">
                      <EditorDescription {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Checkbox de visibilidad */}
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:col-span-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel className="text-gray-700 font-medium">
                      Public Chapter
                    </FormLabel>
                    <FormDescription className="text-gray-500">
                      Check this box to make this chapter available to all users for free preview
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Botón de envío */}
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium py-2.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
