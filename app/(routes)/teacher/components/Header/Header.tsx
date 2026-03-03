"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent, DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { FormCreateCourse } from "./FormCreateCourse";

export default function Header() {
  return (
    <div className="my-5 mx-6 border rounded-lg bg-white">
      <div className="flex justify-between items-center py-5 px-6">
        <h1 className="text-2xl">Teacher account</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200">
              Create course
              <Plus/>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Course</DialogTitle>
                <FormCreateCourse />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
