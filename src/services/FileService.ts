import { ProvideSingleton } from "../ioc";
import * as fs from "fs";

@ProvideSingleton(FileService)
export class FileService {
  public async downloadFile(response: any): Promise<any> {
    response.setHeader(
      "Content-disposition",
      "attachment; filename=nexton-download.png"
    );
    response.setHeader("Content-type", "image/png");

    let readStream = await fs.createReadStream(
      "./src/services/files/nexton-download.png"
    );

    readStream.pipe(response);

    await new Promise((resolve, reject) => {
      readStream.on("end", () => {
        response.end();
        resolve();
      });
    });
  }
}
