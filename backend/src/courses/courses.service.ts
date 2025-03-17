import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async createCourse(data: Prisma.CourseCreateInput) {
    return this.prisma.course.create({ data });
  }

  async getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
      include: { enrollments: { include: { student: true } } },
    });
  }

  async getAllCourses() {
    const courses = await this.prisma.course.findMany({
      include: { enrollments: true },
    });

    return courses.map((course) => ({
      ...course,
      cupoDisponible: course.capacity - course.enrollments.length,
    }));
  }
  async updateCourseCapacity(id: string, capacity: number) {
    return this.prisma.course.update({
      where: { id },
      data: { capacity },
    });
  }
}
