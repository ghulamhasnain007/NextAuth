// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable, { File } from 'formidable';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const form: any = new formidable.IncomingForm();
  
//   form.uploadDir = path.join(process.cwd(), '/public/uploads');
//   form.keepExtensions = true;

//   form.parse(req, (err: any, fields: any, files: any) => {
//     if (err) {
//       return res.status(500).json({ error: 'Something went wrong during the upload.' });
//     }

//     // Type assertion for files
//     const file = (files.file as formidable.File[])[0];
//     if (!file) {
//       return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const filePath = `/uploads/${path.basename(file.filepath)}`;

//     return res.status(200).json({ url: filePath });
//   });
// }
