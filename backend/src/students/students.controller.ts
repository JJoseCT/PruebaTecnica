import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() data: { name: string; email: string }) {
    return this.studentsService.createStudent(data);
  }

  @Get(':id')
  getStudent(@Param('id') id: string) {
    return this.studentsService.getStudentById(id);
  }

  @Get()
  getAllStudents() {
    return this.studentsService.getAllStudents();
  }
}
