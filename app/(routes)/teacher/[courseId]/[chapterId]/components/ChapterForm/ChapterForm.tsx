"use client";
import { Button } from "@/components/ui/button";
import { ChapterFormProps } from "./ChapterForm.types";
import { ArrowLeft, Cog, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Title } from "../../../components";
import axios from "axios";
import { toast } from "sonner";
import { ChapterTitleForm } from "./ChapterTitleForm";
import { ChapterVideoForm } from "./ChapterVideoForm";

export function ChapterForm(props: ChapterFormProps) {
  const { chapter, courseId } = props;
  const router = useRouter();

  if(!chapter) {
    return <p>Chapter not found</p>
  }
  const onPublish=  async (state: boolean) => {
    try {
       await axios.patch(`/api/course/${courseId}/chapter/${chapter.id}`, {
        isPublished: state,
      })
      toast(state ? "Chapter published successfully" : "Chapter unpublished successfully", {
        style: {
          background: '#ecfdf5',
          color: '#047857',
          border: '1px solid #a7f3d0',
          borderRadius: '0.5rem',
          fontWeight: 500,
        }
      })
      router.refresh()
    } catch (error) {
      console.log(error);
      toast.error("Failed to publish chapter", {
        style: {
          background: '#fef2f2',
          color: '#b91c1c',
          border: '1px solid #fecaca',
          borderRadius: '0.5rem',
          fontWeight: 500,
        }
      })
    }
  }

  const removeChapter = async () => {
    axios.delete(`/api/course/${courseId}/chapter/${chapter.id}`)
    router.refresh()
    router.push(`/teacher/${courseId}`)
    toast.success("Chapter deleted successfully", {
      style: {
        background: '#ecfdf5',
        color: '#047857',
        border: '1px solid #a7f3d0',
        borderRadius: '0.5rem',
        fontWeight: 500,
      }
    })
  }
  return (
    <div className="m-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push(`/teacher/${courseId}`)}
          className="flex items-center gap-2 text-sm text-slate-600 hover:bg-slate-100/80 px-4 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to course
        </Button>
      </div>
      
      <div className="p-6 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Title title="Chapter configuration" icon={Cog} />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border-r border-slate-200 pr-3">
              {chapter.isPublished ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/80 text-rose-600 hover:bg-rose-50/80 hover:text-rose-700 border-rose-100 hover:border-rose-200 transition-colors"
                  onClick={() => onPublish(false)}
                >
                  Hide
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-sm hover:shadow transition-all"
                  onClick={() => onPublish(true)} 
                >
                  Show
                </Button>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-500 hover:bg-slate-100/50 hover:text-slate-700 rounded-lg transition-colors"
              onClick={removeChapter}
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
          <ChapterTitleForm courseId={courseId} chapter={chapter} />
          <ChapterVideoForm chapterId={chapter.id} courseId={courseId} videoUrl={chapter.videoUrl} />
    </div>
  );
}
