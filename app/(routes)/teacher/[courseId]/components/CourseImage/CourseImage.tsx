"use client";
import { CourseImageProps } from "./CourseImage.types";
import { Title } from "../Title";
import { FileIcon, Pencil } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import axios from "axios";

export function CourseImage(props: CourseImageProps) {
  const { idCourse, imageCourse } = props;
  const [isEditing, setIsEditing] = useState(false);

  const [image, setImage] = useState(imageCourse)
  const onChangeImage = async (imageURL: string) => {
    console.log(imageURL);
    try {
      await axios.patch(`/api/course/${idCourse}`, {
        imageURL: imageURL
      });
      
      toast.success("Image updated successfully", {
        style: {
          background: '#ecfdf5',
          color: '#047857',
          border: '1px solid #a7f3d0',
          borderRadius: '0.5rem',
          fontWeight: 500,
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the image", {
        style: {
          background: '#fef2f2',
          color: '#b91c1c',
          border: '1px solid #fecaca',
          borderRadius: '0.5rem',
          fontWeight: 500,
        }
      });
    }
    
  }

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 w-full max-w-[400px]">
      <Title title="Course Image" icon={FileIcon} />
      <div className="relative w-full h-[300px] mb-5 overflow-hidden rounded-lg bg-white p-1 shadow-sm">
        {isEditing ? (
          <div className="bg-slate-300 p-4 m-2 rounded-lg">
              <UploadButton 
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  onChangeImage(res[0]?.ufsUrl)
                  setImage(res[0].ufsUrl)
                  setIsEditing(false)
                }}
                onUploadError={() => {
                  toast.error("Error uploading image, please, try again", {
                    style: {
                      background: '#fef2f2',
                      color: '#b91c1c',
                      border: '1px solid #fecaca',
                      borderRadius: '0.5rem',
                      fontWeight: 500,
                    }
                  });
                }}
              />
            </div>
        ): (
        <Image
          src={image || "/default-image.jpg"}
          alt="Course Image"
          width={400}
          height={300}
          className="object-cover w-full h-full rounded-md"
        />
        )}
      </div>
      <Button 
        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        onClick={() => setIsEditing(!isEditing)}
      >
        Edit image
        <Pencil className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
