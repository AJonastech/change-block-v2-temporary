"use client";

import React, { useState } from "react";
import { Avatar, Input, Button, Tabs, Tab } from "@nextui-org/react";
import { FiThumbsUp, FiMessageCircle, FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineSend } from "react-icons/ai";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import { CgClose } from "react-icons/cg";


type TCommentProps = {
  comment: TCommentType;
  handleLike: (id: number) => void;
  handleAddReply: (parentId: number, text: string) => void;
};

const Comment: React.FC<TCommentProps> = ({ comment, handleLike, handleAddReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div className="pb-4 ">
      <div
        className={`flex items-start gap-1 ${
          comment.depth > 0 ? "ml-8 border-l-2 pl-4" : ""
        }`}
      >
        <Avatar size="md" src={comment.avatar} alt={comment.name} />
        <div className="flex flex-col flex-grow bg-white rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">{comment.time}</span>
            <button className="text-gray-500">
              <FiMoreHorizontal />
            </button>
          </div>
          {/* <span className="text-gray-400 text-sm">{comment.time}</span> */}
          <p className="text-gray-700 mt-2">{comment.text}</p>
          <div className="flex gap-4 mt-2">
            <button
              className="flex items-center text-gray-500"
              onClick={() => handleLike(comment.id)}
            >
              <FiThumbsUp className="mr-1" /> {comment.likes} Like
            </button>
            <button
              className="flex items-center text-gray-500"
              onClick={() => setShowReplies(!showReplies)}
            >
              <FiMessageCircle className="mr-1" /> {comment.replies.length}{" "}
              Replies
            </button>
          </div>
        </div>
      </div>
      {comment.replies.length > 2 && (
        <div className="mt-2 ml-8">
          <button
            className="flex justify-center gap-2 items-center text-primary"
            onClick={() => setShowReplies(!showReplies)}
          >
            <span className="">
              {" "}
              {comment.replies.length > 0 &&
                (showReplies
                  ? `View less replies `
                  : `View all ${comment.replies.length} replies`)}
            </span>

            <span className="">
              {" "}
              {showReplies ? <ArrowUp2 size={18} /> : <ArrowDown2 size={18} />}
            </span>
          </button>
        </div>
      )}
      {showReplies && (
        <div className="mt-4  ml-8">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              handleLike={handleLike}
              handleAddReply={handleAddReply}
            />
          ))}
          <div className="flex items-center pt-4">
            <Input
              variant="bordered"
              placeholder="Reply..."
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              classNames={{
                input: ["bg-transparent"],
                innerWrapper: "bg-transparent ",
                inputWrapper: ["bg-transparent border-[1px] !h-16 py-3 px-5"],
              }}
              className="flex-grow"
            />
            <Button
              isIconOnly
              onClick={() => {
                handleAddReply(comment.id, replyText);
                setReplyText("");
              }}
              className="bg-primary text-white ml-2 rounded-xl h-16 w-16"
            >
              <AiOutlineSend />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const EMPAComments = ({ onClick }: { onClick: () => void }) => {
  const initialComments: TCommentType[] = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/assets/dorathy.png",
      time: "2 mins",
      text: "Lorem ipsum dolor sit amet, coetur adipiscing elit ut aliquam, purus sit amet luctus.",
      likes: 15,
      replies: [],
      depth: 0,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/assets/rose.svg",
      time: "2 mins",
      text: "Lorem ipsum dolor sit amet, coetur adipiscing elit ut.",
      likes: 15,
      replies: [],
      depth: 0,
    },
  ];

  const [comments, setComments] = useState<TCommentType[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleLike = (id: number) => {
    const updateComments = (comments: TCommentType[]): TCommentType[] =>
      comments.map((comment) =>
        comment.id === id
          ? { ...comment, likes: comment.likes + 1 }
          : { ...comment, replies: updateComments(comment.replies) }
      );
    setComments(updateComments(comments));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObject: TCommentType = {
        id: comments.length + 1,
        name: "New User",
        avatar: "https://via.placeholder.com/150",
        time: "Just now",
        text: newComment,
        likes: 0,
        replies: [],
        depth: 0,
      };
      setComments([...comments, newCommentObject]);
      setNewComment("");
    }
  };

  const handleAddReply = (parentId: number, text: string) => {
    const updateReplies = (comments: TCommentType[]): TCommentType[] =>
      comments.map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: comments.length + 1 + Math.random(),
                  name: "New User",
                  avatar: "https://via.placeholder.com/150",
                  time: "Just now",
                  text,
                  likes: 0,
                  replies: [],
                  depth: comment.depth + 1,
                },
              ],
            }
          : { ...comment, replies: updateReplies(comment.replies) }
      );
    setComments(updateReplies(comments));
  };

  return (
    <div className="w-full mx-auto my-6 bg-grey-10 rounded-2xl p-6  relative">
      <Button
        className="absolute top-4 right-8 rounded-full bg-grey-20  w-[44px] h-[44px] flex items-center justify-center text-center"
        onPress={onClick}
        isIconOnly
        variant="solid"
      >
        <CgClose />
      </Button>
      <Tabs
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 ",
          cursor: "w-full bg-green-500",
          tab: "max-w-full px-0 h-12 ",
          tabContent:
            "group-data-[selected=true]:text-green-500 text-xl font-semibold -mb-2",
        }}
        variant="underlined"
        aria-label="Comments and Questions Tabs"
      >
        <Tab key="comments" title="Comments">
          <div className="max-h-[20rem] mt-2 overflow-y-auto no-scrollbar ">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                handleLike={handleLike}
                handleAddReply={handleAddReply}
              />
            ))}
          </div>
          <div className="flex items-center mt-4">
            <Input
              variant="bordered"
              placeholder="Start typing..."
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow "
              classNames={{
                input: ["bg-transparent"],
                innerWrapper: "bg-transparent ",
                inputWrapper: ["bg-transparent border-[1px] !h-16 py-3 px-5"],
              }}
            />
            <Button
              isIconOnly
              onClick={handleAddComment}
              className="bg-primary text-white ml-2  h-16 w-16 rounded-xl"
            >
              <AiOutlineSend />
            </Button>
          </div>
        </Tab>
        <Tab key="questions" title="Questions">
          {/* Similar structure as comments but for questions */}
          <QuestionsComponent />
        </Tab>
      </Tabs>
    </div>
  );
};

const QuestionsComponent: React.FC = () => {
  const initialQuestions: TCommentType[] = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/assets/dorathy.png",
      time: "2 mins",
      text: "What is the meaning of life?",
      likes: 5,
      replies: [],
      depth: 0,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/assets/rose.svg",
      time: "5 mins",
      text: "How does one achieve true happiness?",
      likes: 8,
      replies: [],
      depth: 0,
    },
  ];

  const [questions, setQuestions] = useState<TCommentType[]>(initialQuestions);
  const [newQuestion, setNewQuestion] = useState("");

  const handleLike = (id: number) => {
    const updateQuestions = (questions: TCommentType[]): TCommentType[] =>
      questions.map((question) =>
        question.id === id
          ? { ...question, likes: question.likes + 1 }
          : { ...question, replies: updateQuestions(question.replies) }
      );
    setQuestions(updateQuestions(questions));
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      const newQuestionObject: TCommentType = {
        id: questions.length + 1,
        name: "New User",
        avatar: "https://via.placeholder.com/150",
        time: "Just now",
        text: newQuestion,
        likes: 0,
        replies: [],
        depth: 0,
      };
      setQuestions([...questions, newQuestionObject]);
      setNewQuestion("");
    }
  };

  const handleAddReply = (parentId: number, text: string) => {
    const updateReplies = (questions: TCommentType[]): TCommentType[] =>
      questions.map((question) =>
        question.id === parentId
          ? {
              ...question,
              replies: [
                ...question.replies,
                {
                  id: questions.length + 1 + Math.random(),
                  name: "New User",
                  avatar: "https://via.placeholder.com/150",
                  time: "Just now",
                  text,
                  likes: 0,
                  replies: [],
                  depth: question.depth + 1,
                },
              ],
            }
          : { ...question, replies: updateReplies(question.replies) }
      );
    setQuestions(updateReplies(questions));
  };

  return (
    <div>
      {questions.map((question) => (
        <Comment
          key={question.id}
          comment={question}
          handleLike={handleLike}
          handleAddReply={handleAddReply}
        />
      ))}
      <div className="flex items-center mt-4">
        <Input
          variant="bordered"
          placeholder="Ask a question..."
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="flex-grow "
          classNames={{
            input: ["bg-transparent"],
            innerWrapper: "bg-transparent ",
            inputWrapper: ["bg-transparent border-[1px] !h-16 py-3 px-5"],
          }}
        />
        <Button
          isIconOnly
          onClick={handleAddQuestion}
          className="bg-primary text-white ml-2 rounded-xl h-16 w-16"
        >
          <AiOutlineSend />
        </Button>
      </div>
    </div>
  );
};

export default EMPAComments;

//view
