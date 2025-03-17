import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async createStudent(data: Prisma.StudentCreateInput) {
    return this.prisma.student.create({ data });
  }

  async getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
      include: { enrollments: { include: { course: true } } },
    });
  }

  async getAllStudents() {
    return this.prisma.student.findMany();
  }
}
