import {
  BadRequestException, Controller, Post,
  UploadedFile, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StaffGuard } from '../auth/guards/staff.guard';

const ALLOWED_EXT = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
  '.zip', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];

const INQUIRY_EXT = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.zip'];

const makeStorage = () => diskStorage({
  destination: join(process.cwd(), 'uploads'),
  filename: (_req, file, cb) => {
    cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`);
  },
});

@Controller('upload')
export class UploadController {
  // 내부 계정(admin·staff)용 파일 업로드 (산출물 등)
  @Post()
  @UseGuards(JwtAuthGuard, StaffGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: makeStorage(),
      limits: { fileSize: 50 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        cb(null, ALLOWED_EXT.includes(extname(file.originalname).toLowerCase()));
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('파일이 없거나 허용되지 않는 형식입니다.');
    return {
      url: `/uploads/${file.filename}`,
      name: file.originalname,
      size: `${(file.size / 1024).toFixed(0)}KB`,
    };
  }

  // 문의 첨부파일 업로드 (인증 불필요, ThrottlerGuard만 적용)
  @Post('inquiry')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: makeStorage(),
      limits: { fileSize: 20 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        cb(null, INQUIRY_EXT.includes(extname(file.originalname).toLowerCase()));
      },
    }),
  )
  uploadInquiry(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('파일이 없거나 허용되지 않는 형식입니다. (pdf/doc/docx/xls/xlsx/ppt/pptx/zip)');
    return {
      url: `/uploads/${file.filename}`,
      name: file.originalname,
      size: `${(file.size / 1024).toFixed(0)}KB`,
    };
  }
}
