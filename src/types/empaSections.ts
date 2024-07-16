type TCommentType = {
  id: number;
  name: string;
  avatar: string;
  time: string;
  text: string;
  likes: number;
  replies: TCommentType[];
  depth: number;
};
