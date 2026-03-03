// app/(routes)/teacher/components/ListCourses/CourseCard/CourseCard.tsx

import Image from "next/image";
import { CourseCardProps } from "./CourseCard.types";
import { ChartNoAxesColumn, EuroIcon } from "lucide-react";
import { Actions } from "./Actions";

export function CourseCard({ course }: CourseCardProps) {
  const { title, price, level, imageURL, description, isPublished, id } = course;

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row gap-4 items-start justify-between">
        <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
          <div className="relative w-32 h-24 flex-shrink-0">
            <Image
              src={imageURL || "/default-image.jpg"}
              alt="Imagen del curso"
              fill
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center mt-2 gap-3">
              <h2 className="text-xl font-medium">{title}</h2>
              {isPublished ? (
                <span className=" inline-block bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-md mt-1">
                  Public
                </span>
              ) : (
                <span className=" inline-block bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-md mt-1">
                  No public
                </span>
              )}
            </div>
            {description && (
              <p className=" text-gray-400 w-full max-w-lg line-clamp-1 text-sm">
                {description}
              </p>
            )}

            <div className="flex flex-col md:flex-row gap-5 items-center">
              <div className="flex gap-1 items-center text-sm mt-2">
                <EuroIcon className="w-4 h-4 text-gray-500"/>
                <span className="text-grey-500">Price:</span>
                <span className="font-semibold">{price || 0}</span>
              </div>

              <div className="flex gap-1 items-center text-sm mt-2">
                <ChartNoAxesColumn className=" w-4 h-4 text-gray-500"/>
                <span className=" text-gray-500">Nivel:</span>
                <span className="font-semibold">{level || "Basic"}</span>
              </div>
            </div>
          </div>
        </div>

        <Actions courseId={id} />
      </div>
    </div>
  );
}
