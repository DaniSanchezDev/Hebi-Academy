"use client";
import { ProgressCourseProps } from "./ProgressCourse.types";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/formatPrice";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

export function ProgressCourse(props: ProgressCourseProps) {
  const { courseId, totalChapters, price } = props;

  const { user } = useUser();
  const [progressCourse, setProgressCourse] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.id) return setLoading(false);

      try {
        const { data } = await axios.post("/api/get-user-progress", {
          courseId,
          userId: user.id,
        });

        setProgressCourse(data.progress);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [courseId, user?.id]);

  if (!user) {
    return <p className="text-center ">Not signed in</p>;
  }

  if(loading) return <p className="text-xs pt-2">Loading...</p>

  return (
    <div className="mt-4">
      {totalChapters > 0 && progressCourse > 0 ? (
        <div>
          <Progress value={progressCourse} className="[&>*]:bg-violet-300" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {progressCourse}% Complete
          </p>
        </div>
      ) : price === "0" ? (
        <p>Free</p>
      ) : (
        <p>{formatPrice(price)}</p>
      )}
    </div>
  );
}
