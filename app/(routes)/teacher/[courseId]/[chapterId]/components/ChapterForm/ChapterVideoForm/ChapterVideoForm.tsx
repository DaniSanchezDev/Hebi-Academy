"use client";
import { Pencil, Video } from "lucide-react";
import { Title } from "../../../../components";
import { ChapterVideoFormProps } from "../ChapterVideoForm.types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function ChapterVideoForm(props: ChapterVideoFormProps) {
  const { chapterId, courseId, videoUrl } = props;
  const [onEditVideo, setOnEditVideo] = useState(false);
  const router = useRouter();
  const onSubmit = async (url: string) => {
    try {
      await axios.patch(`/api/course/${courseId}/chapter/${chapterId}`, {
        videoUrl: url,
      });
      toast.success("Video updated successfully!", {
        style: {
          background: "hsl(143, 61%, 93%)",
          color: "hsl(141, 71%, 48%)",
          border: "1px solid hsl(141, 71%, 73%)",
          borderRadius: "0.5rem",
          padding: "1rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
        duration: 4000,
      });
      router.refresh();
      router.back();
    } catch (error) {
      console.log(error);
      toast.error("Error updating video", {
        style: {
          background: "hsl(0, 100%, 80%)",
          color: "hsl(0, 100%, 20%)",
          border: "1px solid hsl(0, 100%, 70%)",
          borderRadius: "0.5rem",
          padding: "1rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
        duration: 4000,
      });
    }
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-md">
      <Title title="Add or change the video" icon={Video} />

      {videoUrl ? (
        <video
          src={videoUrl}
          controls
          className="w-full h-64 object-cover rounded-md"
        />
      ) : (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">
          <p className="text-gray-500">No video uploaded</p>
        </div>
      )}

      <div className=" mt-4 p-2 rounded-md border">
        <Button
          className="w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 hover:text-white text-white font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          variant="ghost"
          onClick={() => setOnEditVideo(true)}
        >
          {onEditVideo ? "Select your video" : "Edit video"}
          <Pencil className="ml-2 w-4 h-4" />
        </Button>

        {onEditVideo && (
          <UploadButton
            className="w-full bg-slate-200 rounded-md p-2 mt-2"
            endpoint="chapterVideo"
            onClientUploadComplete={(url) => {
              console.log(url);

              if (url) {
                onSubmit(url[0].serverData.file);
              }
            }}
            onUploadError={(error: Error) => {
              console.log(error);
            }}
          />
        )}
      </div>
    </div>
  );
}
