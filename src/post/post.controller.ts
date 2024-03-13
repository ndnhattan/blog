import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { AuthGuard } from 'src/auth/auth.guard';
import { extname } from 'path';
import { PostService } from './post.service';
import { FilterPostDto } from './dtos/filter-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { UpdatePostDto } from './dtos/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: storageConfig('post'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.jpeg', '.png'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValitionError =
              'File size is too large. Max file size is 5MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  create(
    @Req() req: any,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File not found');
    }

    return this.postService.create(req.user.id, {
      ...createPostDto,
      thumbnail: 'post/' + file.filename,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query: FilterPostDto): Promise<any> {
    return this.postService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findDetail(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findDetail(Number(id));
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: storageConfig('post'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.jpeg', '.png'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValitionError =
              'File size is too large. Max file size is 5MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (file) {
      updatePostDto.thumbnail = 'post/' + file.filename;
    }

    return this.postService.update(Number(id), updatePostDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postService.delete(Number(id));
  }

  @Post('cke-upload')
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('upload', {
      storage: storageConfig('ckeditor'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.jpeg', '.png'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValitionError =
              'File size is too large. Max file size is 5MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  ckeUpload(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
    return {
      url: `ckeditor/${file.filename}`,
    };
  }
}
