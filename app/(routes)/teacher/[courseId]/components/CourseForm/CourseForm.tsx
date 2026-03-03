"use client";
import { Cog } from "lucide-react";
import { Title } from "../Title";
import { CouseFormTypes } from "./CourseForm.types";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formSchema } from "./CourseForm.form";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

export default function CourseForm(props: CouseFormTypes) {
  const { course } = props;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title || "",
      slug: course.slug || "",
      description: course.description || "",
      category: course.category || "",
      level: course.level || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/course/${course.id}`, values);
      toast("Course updated successfully", {
        icon: <CheckCircle className="h-4 w-4 text-green-600" />,
        style: {
          background: '#F0FDF4',
          color: '#166534',
          border: '1px solid #BBF7D0',
          borderRadius: '0.5rem',
        }
      });
    } catch {
      toast("Failed to update course", {
        icon: <XCircle className="h-4 w-4 text-red-600" />,
        style: {
          background: '#FEF2F2',
          color: '#B91C1C',
          border: '1px solid #FECACA',
          borderRadius: '0.5rem',
        }
      });
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl shadow-lg border border-indigo-100">
      <Title title="Config course" icon={Cog} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-indigo-900 font-medium">Course Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="ReactJS Course" 
                      className="bg-white border-indigo-200 focus:border-indigo-400 focus-visible:ring-indigo-300"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription className="text-indigo-600">
                    Write the title of the course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-indigo-900 font-medium">Course URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="react-js-course" 
                      className="bg-indigo-50 border-indigo-200 text-indigo-800" 
                      {...field} 
                      disabled 
                    />
                  </FormControl>
                  <FormDescription className="text-indigo-600">
                    The URL of the course. It is unique and can not be modified
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-indigo-900 font-medium">Course Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white border-indigo-200 focus:ring-2 focus:ring-indigo-200 focus:ring-offset-1">
                        <SelectValue placeholder="Select a category for your course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Full Stack">Full Stack</SelectItem>
                      <SelectItem value="UX/UI">UX/UI</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-indigo-900 font-medium">Course Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white border-indigo-200 focus:ring-2 focus:ring-indigo-200 focus:ring-offset-1">
                        <SelectValue placeholder="Select the level of your course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-indigo-900 font-medium">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about the course"
                  className="resize-none min-h-[120px] bg-white border-indigo-200 focus:border-indigo-400 focus-visible:ring-indigo-300"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-indigo-600">
                Description of the course
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
