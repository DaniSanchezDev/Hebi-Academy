"use client";
import { HeaderCourseProps } from "./HeaderCourse.types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, MoveLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function HeaderCourse(props: HeaderCourseProps) {
  const { idCourse, isPublished } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePublish = async (state: boolean) => {
    setIsLoading(true);
    try {
        // Publicar o despublicar el curso
      axios.patch(`/api/course/${idCourse}`, {
        isPublished: state,
      });
      toast(state ? "Course released" : "Course hidden");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    await axios.delete(`/api/course/${idCourse}`);
    toast("Course deleted successfully", {
        icon: <Trash2 className="h-4 w-4 text-red-600" />,
        style: {
            background: '#FEF2F2',
            color: '#B91C1C',
            border: '1px solid #FECACA',
            borderRadius: '0.5rem',
        }
    });
    router.push("/teacher");
};

  return (
    <div className="border-b pb-4 mb-6">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-start md:items-center">
        <Button
          onClick={() => router.push("/teacher")}
          variant="ghost"
          className="flex items-center gap-2 hover:bg-slate-100 cursor-pointer transition-colors"
        >
          <MoveLeft className="h-4 w-4" />
          <span>Back to courses</span>
        </Button>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {isPublished ? (
            <Button
              onClick={() => handlePublish(false)}
              disabled={isLoading}
              variant="outline"
              className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 flex items-center gap-2 transition-colors"
            >
              {isLoading ? (
                <span className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
              <span>Unpublish</span>
            </Button>
          ) : (
            <Button
              onClick={() => handlePublish(true)}
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 transition-colors"
            >
              {isLoading ? (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span>Publish</span>
            </Button>
          )}
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            aria-label="Delete course"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
