import { Route, Controller, Tags, Post, Request } from "tsoa";
import { ProvideSingleton, inject } from "../ioc";
import { FileService } from "../services/FileService";
import * as express from "express";

@Tags("files")
@Route("files")
@ProvideSingleton(FileController)
export class FileController extends Controller {
  constructor(@inject(FileService) private service: FileService) {
    super();
  }

  /**
   * @summary Downloads a sample file that is stored within the project
   *
   * @param request
   */
  @Post("download")
  public async downloadFile(@Request() request: any): Promise<any> {
    const response = request.res as express.Response;
    return await this.service.downloadFile(response);
  }
}
