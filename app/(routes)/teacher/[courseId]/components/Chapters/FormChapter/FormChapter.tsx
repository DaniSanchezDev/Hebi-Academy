import { FormChapterProps } from "./FormChapter.types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl, FormField,
    FormItem, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./FormChapter.form";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function FormChapter(props: FormChapterProps) {
  const { setShowInputChapter, idCourse } = props;

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/course/${idCourse}/chapter`, {
        title: values.title
      });
      
      toast.success("Chapter created successfully", {
        style: {
          background: '#ecfdf5',
          color: '#047857',
          border: '1px solid #a7f3d0',
          borderRadius: '0.5rem',
          fontWeight: 500,
        },
        description: `"${values.title}" has been added to your course.`,
      });
      
      setShowInputChapter(false);
      router.refresh();
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create chapter", {
        style: {
          background: '#fef2f2',
          color: '#b91c1c',
          border: '1px solid #fecaca',
          borderRadius: '0.5rem',
          fontWeight: 500,
        },
        description: "Please try again later.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
                
              <FormControl>
                <Input placeholder="e.g. Introduction to the course" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => setShowInputChapter(false)}
            className="hover:bg-slate-200"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            {form.formState.isSubmitting ? 'Creating...' : 'Create Chapter'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
