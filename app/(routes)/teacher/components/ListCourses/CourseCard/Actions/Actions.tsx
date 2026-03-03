"use client"
import { Button } from "@/components/ui/button";
import { ActionsProps } from "./Actions.types";
import { Edit, Trash, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function Actions(props: ActionsProps) {
  const { courseId } = props;

  const router = useRouter();

  const editCourse = () => {
    router.push(`/teacher/${courseId}`);
  };

  const deleteCourse = async () => {
    try {
      await axios.delete(`/api/course/${courseId}`);
      toast("Course deleted successfully", {
        icon: <Trash2 className="h-4 w-4 text-red-600" />,
        style: {
            background: '#FEF2F2',
            color: '#B91C1C',
            border: '1px solid #FECACA',
            borderRadius: '0.5rem',
        }
    });

      router.refresh(); // Esto recargará los datos de la página
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course");
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full lg:max-w-42 mt-2">
      <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200" onClick={editCourse}>
        <Edit className="w-5 h-5" /> Edit
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full text-red-500 border-red-500 hover:bg-red-100 hover:text-red-500">
            <Trash className="w-4 h-4"/> Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this course.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteCourse} className=" bg-red-400 hover:bg-red-500 text-black font-semibold">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
