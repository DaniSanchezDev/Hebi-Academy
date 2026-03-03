'use client';

import { PenLine, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import DeleteModal from "./DeleteModal";

interface CourseActionsProps {
  courseId: string;
}

export default function CourseActions({ courseId }: CourseActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openDeleteModal = () => {
    setIsModalOpen(true);
  };
  
  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };
  
  const handleDelete = async () => {
    try {      
      setIsDeleting(true);
      
      await axios.delete(`/api/courses/${courseId}`);
      
      toast.success("Course deleted successfully", {
        description: "The course has been removed from the system",
        duration: 5000,
      });
      
      router.refresh();
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course", {
        description: "There was an error while trying to delete the course",
      });
    } finally {
      setIsModalOpen(false);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <Link 
        href={`/admin/courses/edit/${courseId}`}
        className="p-2 rounded-md bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-800/50 transition-colors"
      >
        <PenLine className="w-4 h-4" />
      </Link>
      <button 
        className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={openDeleteModal}
        disabled={isDeleting}
      >
        <Trash2 className="w-4 h-4" />
      </button>
      
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Course"
        loading={isDeleting}
      />
    </div>
  );
}
