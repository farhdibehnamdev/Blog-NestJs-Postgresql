import { BadRequestException, Injectable } from "@nestjs/common";
import { getResponseMessage } from "src/shared/constants/messages.constant";
import { responseData } from "src/shared/functions/response.func";
import { ResizeService } from "./resize.service";
import { unlink, writeFile, stat, mkdir } from "fs/promises";
import { InjectQueue } from "@nestjs/bull";
import { QueuesConstant } from "../../shared/constants/queues.constant";
import { Queue } from "bull";
import { ReSizeFileQueue } from "../../shared/interfaces/queues.interface";
@Injectable()
export class uploadService {
  constructor(
    private readonly resizeService: ResizeService,
    @InjectQueue(QueuesConstant.RESIZE_FILE)
    private resizeFileQueue: Queue<ReSizeFileQueue>
  ) {}

  async upload(file: Express.Multer.File) {
    try {
      if (!file)
        throw new BadRequestException(getResponseMessage("FILE_IS_REQUIRED"));

      await this.resizeFileQueue.add({
        filePath: file.path,
        width: 500,
        height: 500,
      });

      const path_ = `./uploads/posts`;

      const state = await stat(path_);
      if (!state.isDirectory()) {
        await mkdir(path_);
      }

      //   await writeFile(file.path, file);

      return file.filename;
    } catch (error) {
      throw error;
    }
  }
}
