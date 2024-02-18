import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class GenreService {

	async create(dto: Prisma.GenreCreateInput) {
		return this.prisma.genre.create({ data: dto });
	}

	async update(id: number, dto: Partial<CreateGenreDto>) {
		return this.prisma.genre.update({ where: { id }, data: dto });
	}

	async getAll(slug?: string) {
		const options = this.configureGetAllGenreOptions({ slug });
		return this.prisma.genre.findMany({ where: options, orderBy: { createdAt: 'asc' } });
	}

	async delete(id: number) {
		const genre = await this.prisma.genre.findFirst({ where: { id } });
		if (!genre) {
			throw new NotFoundException('This genre doesn\'t exist!');
		}
		return this.prisma.genre.delete({ where: { id } });
	}

	private configureGetAllGenreOptions({ slug }: { slug?: string }) {
		let options: Prisma.GenreWhereInput = {};

		if (slug !== undefined) {
			options = {
				slug: {
					equals: slug,
				},
			};
		}
		return options;
	}


	constructor(private readonly prisma: PrismaService) {

	}

}
