"use client"
import { DownloadCertificateProps } from "./DownloadCertificate.types";
import { Button } from "@/components/ui/button";
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
import { DownloadIcon } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas-pro"
import { Certificate } from "./Certificate";

export function DownloadCertificate(props: DownloadCertificateProps) {
  const { userName, titleCourse } = props;

  const certRef = useRef<HTMLDivElement>(null)

  const handleDownload = async() => {
    if(!certRef.current) {
      return
    }
    const canvas = await html2canvas(certRef.current, {
        scale: 1
    })
    const link = document.createElement("a")
    link.download = `${userName}-${titleCourse}-Certificate.png`
    link.href = canvas.toDataURL("image/png")
    link.click()


  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl hover:from-indigo-600 hover:to-violet-600 border border-indigo-100 shadow-md transition-all duration-200">
            Download Certificate
            <DownloadIcon className="ml-2 h-4 w-4"/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full !max-w-[900px] bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Download your certificate</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <Certificate
              certRef={certRef}
              userName={userName}
              titleCourse={titleCourse}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border border-indigo-200 text-indigo-700 hover:bg-indigo-50 rounded-xl">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDownload} 
            className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl hover:from-indigo-600 hover:to-violet-600 border border-indigo-100"
          >
            Download
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
