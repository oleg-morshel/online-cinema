import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { GenreService } from './genre.service';
import { Auth } from '../auth/decorator/auth.decorator';
import { CreateGenreDto } from './dto/create-genre.dto';

@Controller('genre')
export class GenreController {

	@Post('')
	@Auth('admin')
	async create(@Body() dto: CreateGenreDto) {
		return this.genreService.create(dto);
	}

	@Put(':id')
	@Auth('admin')
	async update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateGenreDto>) {
		return this.genreService.update(id, dto);
	}


	@Get('by-slug/:slug')
	@HttpCode(200)
	async getBySlug(@Param('slug') slug: string) {
		return this.genreService.getAll(slug);
	}

	@Get('')
	@HttpCode(200)
	async getAll() {
		return this.genreService.getAll();
	}

	@Delete(':id')
	@Auth('admin')
	async delete(@Param('id', ParseIntPipe) id: number) {
		return this.genreService.delete(id);
	}

	constructor(private readonly genreService: GenreService) {

	}

}
