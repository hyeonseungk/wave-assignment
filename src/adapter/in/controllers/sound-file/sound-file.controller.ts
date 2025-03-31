import {
  Body,
  Controller,
  Inject,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplicationService } from '../../../../application/applicatioin.module';
import {
  SoundFileSvc,
  SoundFileUploadCommand,
} from '../../../../application/port/in/sound-file.service.interface';
import { Id } from '../../../../domain/entity/type';
import { SOUND_UPLOAD_MAX_SIZE } from '../../../../domain/policy/sound.policy';
import { UserId } from '../../../common/decorator/user-id.decorator';
import { AccessControl } from '../../../common/guards/access-guard';
import { UserLevel } from '../../../common/guards/type';
import { StatusCode } from '../../../common/type/status-code';
import { SoundUploadRequestBody } from './dto/sound-file-upload.request.body';

@Controller('/api/v1')
@AccessControl(UserLevel.MEMBER)
export class SoundFileController {
  constructor(
    @Inject(ApplicationService.SoundFileSvc)
    private readonly soundFileService: SoundFileSvc,
  ) {}

  @Post('/common/upload/audio')
  @UseInterceptors(FileInterceptor('soundFile'))
  async uploadSound(
    @UserId() userId: Id,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^audio\/(wav|mp3|mpeg|x-wav)$/i,
        })
        .addMaxSizeValidator({ maxSize: SOUND_UPLOAD_MAX_SIZE })
        .build({ errorHttpStatusCode: StatusCode.BAD_REQUEST as number }),
    )
    soundFile: Express.Multer.File,
    @Body() body: SoundUploadRequestBody,
  ) {
    const { fileName, fileSize, duration } = body;
    const command = new SoundFileUploadCommand(
      userId,
      soundFile,
      fileName,
      fileSize,
      duration,
    );
    const result = await this.soundFileService.upload(command);
    return result;
  }
}
