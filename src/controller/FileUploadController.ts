import { Request, Response } from "express";
import { extname } from "path";

export class FileUploadController {
	static async uploadFile(req: Request) {
		if (!req.files || Object.keys(req.files).length === 0) {
			throw {
				status: false,
				type: "input",
				msg: "No files were provided.",
			};
		}

		const uploadFile = req.files.file;
		const uploadFileName = uploadFile.md5 + extname(uploadFile.name);
		const uploadPath = __dirname + "/../../uploads/" + uploadFileName;

		uploadFile.mv(uploadPath, function (err) {
			if (err) {
				console.log(err);
				throw {
					status: false,
					type: "server",
					msg: "Sorry!. Something went wrong.",
				};
			}
		});

		return {
			status: true,
			data: { filename: uploadFileName },
		};
	}
}
