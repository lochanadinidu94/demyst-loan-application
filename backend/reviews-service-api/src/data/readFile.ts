import { createReadStream } from 'fs';
import * as path from 'path';

type ReviewType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

let saved;

export const getReviews = async (): Promise<ReviewType[]> => {
  return new Promise((res, rej) => {
    if (saved) return res(saved);
    const createReader = createReadStream(
      path.join(__dirname, '../../src/data/data.json'),
    );
    let data = '';
    createReader.on('data', (readed) => {
      data += readed;
    });
    createReader.on('close', () => {
      res(JSON.parse(data));
    });
  });
};
