import 'dotenv/config';
import { YoutubeUploader } from './class';

const test = async () => {
  const uploader = new YoutubeUploader();

  await uploader.sign(
    {
      email: process.env.YOUTUBE_EMAIL,
      password: process.env.YOUTUBE_PASSWORD,
      channelName: process.env.YOUTUBE_CHANNEL_NAME,
    },
    { headless: false },
  );

  await uploader.upload({
    path: './temp/test.mp4',
    title: `${Date.now()}`,
    description: `TEST ${new Date().toLocaleString()}`,
  });
};

test();
