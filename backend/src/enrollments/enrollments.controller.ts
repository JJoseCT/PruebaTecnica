import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  enroll(@Body() data: { studentId: string; courseId: string }) {
    return this.enrollmentsService.enrollStudent(data.studentId, data.courseId);
  }

  @Get('student/:id')
  getStudentEnrollments(@Param('id') studentId: string) {
    return this.enrollmentsService.getStudentEnrollments(studentId);
  }

  @Get('course/:id')
  getCourseEnrollments(@Param('id') courseId: string) {
    return this.enrollmentsService.getCourseEnrollments(courseId);
  }

  @Get()
  getAllEnrollments() {
    return this.enrollmentsService.getAll();
  }
}
