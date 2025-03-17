import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  getAll() {
    return this.prisma.enrollment.findMany();
  }
  constructor(private prisma: PrismaService) {}

  async enrollStudent(studentId: string, courseId: string) {
    // Verificar si el curso tiene cupo disponible
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: { enrollments: true },
    });

    if (!course) {
      throw new BadRequestException('Curso no encontrado');
    }

    if (course.enrollments.length >= course.capacity) {
      throw new BadRequestException('No hay cupo disponible en este curso');
    }

    // Registrar la matrícula
    return this.prisma.enrollment.create({
      data: {
        student: { connect: { id: studentId } },
        course: { connect: { id: courseId } },
      },
    });
  }

  async getStudentEnrollments(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { studentId },
      include: { course: true },
    });
  }

  async getCourseEnrollments(courseId: string) {
    return this.prisma.enrollment.findMany({
      where: { courseId },
      include: { student: true },
    });
  }
}
