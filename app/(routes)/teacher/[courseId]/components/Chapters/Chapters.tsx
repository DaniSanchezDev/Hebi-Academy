"use client";
import { ChapterProps } from "./Chapters.types";
import { Title } from "../Title";
import {
  GripVertical,
  ListCheckIcon,
  Loader2,
  Pencil,
  PlusCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FormChapter } from "./FormChapter";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function Chapters(props: ChapterProps) {
  const { idCourse, chapters } = props;

  const [chaptersList, setChaptersList] = useState(chapters ?? []);
  const [showInputChapter, setShowInputChapter] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter();

  useEffect(() => {
    setChaptersList(chapters ?? [])
  }, [chapters])

  const onEditChapter = (chapterId: string) => {
    router.push(`/teacher/${idCourse}/${chapterId}`);
  };

  const handleOnDragEnd = (result: DropResult) => {
      // Verifica si hay un destino válido (si se soltó el elemento en un área válida)
      if (!result.destination) return;
      
      // Crea una copia del array actual de capítulos para no modificar el estado directamente
      const items = Array.from(chaptersList);
      
      // Extrae el elemento que se está moviendo de su posición original
      // splice() modifica el array original y devuelve un array con los elementos eliminados
      // Aquí usamos desestructuración para obtener el primer (y único) elemento movido
      const [reorderedItem] = items.splice(result.source.index, 1);
      
      // Inserta el elemento movido en su nueva posición
      // El segundo parámetro (0) indica que no se eliminará ningún elemento, solo se insertará
      items.splice(result.destination.index, 0, reorderedItem);
      
      // Actualiza el estado con el nuevo orden de capítulos
      setChaptersList(items);
      const bulkUpdate = items.map((chapter, index) => ({
        id: chapter.id,
        position: index,
      }))

      onReorder(bulkUpdate)
  };

  const onReorder = async (updateData: {id: string, position: number}[]) => {
    try {
      setIsUpdating(true);
      
      // Hacer la petición PUT con await
      await axios.put(`/api/course/${idCourse}/chapter/reorder`, {
        list: updateData
      });
      
      toast.success("Chapters reordered successfully", {
        style: {
          background: '#ecfdf5',
          color: '#047857',
          border: '1px solid #a7f3d0',
          borderRadius: '0.5rem',
          fontWeight: 500,
        }
      });
      
      // Refrescar la página para ver los cambios
      router.refresh();
    } catch (error) {
      console.error("Error reordering chapters:", error);
      
        toast.error("Failed to reorder chapters", {
            style: {
                background: '#fef2f2',
                color: '#b91c1c',
                border: '1px solid #fecaca',
                borderRadius: '0.5rem',
                fontWeight: 500,
              }
        })
      
    }finally {
      setIsUpdating(false)
    }

  }

  return (
    <div className="p-5 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-md h-fit relative">
      <Title title="Chapters" icon={ListCheckIcon} />
      <div className="flex gap-2 items-center justify-between mb-3">
        <p>Complete Chapters</p>

        <Button
          onClick={() => setShowInputChapter(true)}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium py-1.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm flex items-center gap-2"
        >
          <PlusCircleIcon className="w-4 h-4" />
          Create chapter
        </Button>
      </div>
      {showInputChapter && (
        <FormChapter
          setShowInputChapter={setShowInputChapter}
          idCourse={idCourse}
        />
      )}

      {isUpdating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" />
          <div className="relative z-10 flex flex-col items-center justify-center p-6 bg-white/80 rounded-xl shadow-2xl border border-white/20 backdrop-blur-md">
            <Loader2 className="animate-spin w-8 h-8 text-indigo-600 mb-2" />
            <p className="text-sm font-medium text-slate-700">Reordering chapters...</p>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="chapters">
          {(provider) => (
            <div
              {...provider.droppableProps}
              ref={provider.innerRef}
              className="flex flex-col gap-2"
            >
              {chaptersList?.map((chapter, index) => (
                <Draggable
                  key={chapter.id}
                  draggableId={chapter.id}
                  index={index}
                >
                  {(provider) => (
                    <div
                      {...provider.draggableProps}
                      {...provider.dragHandleProps}
                      ref={provider.innerRef}
                      className="flex gap-2 items-center bg-slate-200 rounded-md py-2 px-4 text-sm justify-between"
                    >
                      <div className=" flex gap-2 items-center">
                        <GripVertical className="h-4 w-4 text-slate-600" />
                        <p>{chapter.title}</p>
                      </div>
                      <div className="flex gap-2 items-center px-2 py-1">
                        {chapter.isPublished ? (
                          <p className=" px-2 py-1 text-emerald-700">
                            Published
                          </p>
                        ) : (
                          <p className=" px-2 py-1 text-red-700">Unpublished</p>
                        )}
                        <div
                          className="cursor-pointer"
                          onClick={() => onEditChapter(chapter.id)}
                        >
                          <Pencil className="h-4 w-4 text-slate-600" />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provider.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
