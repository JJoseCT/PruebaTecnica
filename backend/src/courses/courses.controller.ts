import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() data: { name: string; capacity: number }) {
    return this.coursesService.createCourse(data);
  }

  @Get(':id')
  getCourse(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @Get()
  getAllCourses() {
    return this.coursesService.getAllCourses();
  }

  @Patch(':id')
  updateCapacity(@Param('id') id: string, @Body() data: { capacity: number }) {
    return this.coursesService.updateCourseCapacity(id, data.capacity);
  }
}
