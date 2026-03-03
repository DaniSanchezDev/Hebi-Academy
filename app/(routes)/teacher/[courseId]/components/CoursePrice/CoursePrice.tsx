"use client"

import { useState } from "react";
import { FileIcon } from "lucide-react";
import { Title } from "../Title";
import { CoursePriceProps } from "./CoursePrice.types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

export function CoursePrice(props : CoursePriceProps) {

    const {idCourse, priceCourse} = props
    const [price, setprice] = useState<string | undefined>(priceCourse || "Free")

    const onChangePrice = async () => {
        try {
            await axios.patch(`/api/course/${idCourse}`, {
                price: price,
            });
            toast.success("Price updated successfully", {
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
            toast.error("An error occurred while updating the price", {
                style: {
                    background: '#fef2f2',
                    color: '#b91c1c',
                    border: '1px solid #fecaca',
                    borderRadius: '0.5rem',
                    fontWeight: 500,
                }
            });
        }
    };

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 w-full h-fit">
        <Title title="Course Price" icon={FileIcon} />
        <Select onValueChange={setprice} defaultValue={price}>
            <SelectTrigger className=" w-full">
                <SelectValue placeholder="Select a price" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Course Price</SelectLabel>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="13,99">13,99€</SelectItem>
                    <SelectItem value="25,99">25,99€</SelectItem>
                    <SelectItem value="37,99">37,99€</SelectItem>
                    <SelectItem value="59,99">59,99€</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        <Button 
          onClick={onChangePrice} 
          disabled={!price} 
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mt-3 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Save price
        </Button>
    </div>
  )
}
