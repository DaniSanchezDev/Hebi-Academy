import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    
    if (!courseId) {
      return new NextResponse("Course ID is required", { status: 400 });
    }
    

    const course = await prisma.course.findUnique({
      where: {
        id: courseId
      },
      include: {
        chapters: {
          orderBy: {
            position: 'asc'
          }
        }
      }
    });
    
    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }
    
    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    // Verificar autenticación y roles
    const user = await currentUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    // Verificar si el usuario es administrador
    if (user.publicMetadata.role !== "admin") {
      return new NextResponse("Permission denied", { status: 403 });
    }
    
    const { courseId } = params;
    
    if (!courseId) {
      return new NextResponse("Course ID is required", { status: 400 });
    }
    

    const body = await req.json();
    const { title, description, imageURL, price, isPublished } = body;
    

    const updatedCourse = await prisma.course.update({
      where: {
        id: courseId
      },
      data: {
        title,
        description,
        imageURL,
        price: price !== undefined ? parseFloat(price.toString()).toString() : undefined,
        isPublished
      }
    });
    
    return NextResponse.json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse
    });
  } catch (error) {
    console.error("[COURSE_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    // Verificar autenticación y roles
    const user = await currentUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    // Verificar si el usuario es administrador
    if (user.publicMetadata.role !== "admin") {
      return new NextResponse("Permission denied", { status: 403 });
    }
    
    const { courseId } = params;
    
    if (!courseId) {
      return new NextResponse("Course ID is required", { status: 400 });
    }


    await prisma.chapter.deleteMany({
      where: {
        courseId
      }
    });




    const deletedCourse = await prisma.course.delete({
      where: {
        id: courseId
      }
    });

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully",
      deletedCourse
    });
  } catch (error) {
    console.error("[COURSE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
