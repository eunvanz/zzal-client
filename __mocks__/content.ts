import { Content } from "~/types";

const content: Content = {
  createdAt: "2021-10-11T14:20:45.252Z",
  updatedAt: "2021-10-11T14:20:45.252Z",
  id: 2,
  userId: null,
  path: "duckingmad",
  title: "What the duck",
  description: "I'm ducking mad",
  images: [
    {
      createdAt: "2021-10-11T14:20:45.259Z",
      updatedAt: "2021-10-11T14:20:45.259Z",
      id: 11,
      url:
        "https://s3.ap-northeast-2.amazonaws.com/files.zzal.me/images/test/test_1633962045140.jpeg",
      seq: 1,
      contentId: 2,
    },
  ],
};

const mockContent = {
  content,
};

export default mockContent;
