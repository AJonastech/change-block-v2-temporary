"use client";
import { RiArchiveStackFill } from "react-icons/ri";
import { HiMiniCircleStack } from "react-icons/hi2";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { PiChartLineFill } from "react-icons/pi";
import { GrCycle } from "react-icons/gr";
import { CgTrending } from "react-icons/cg";
import { VscThumbsupFilled } from "react-icons/vsc";
import { AiFillAppstore } from "react-icons/ai";
import { FaUnlockAlt, FaLock } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { SlReload } from "react-icons/sl";
import { BsPersonPlus } from "react-icons/bs";
import { BsChatSquare } from "react-icons/bs";
import { GoStack } from "react-icons/go";
import { IoShareSocialOutline } from "react-icons/io5";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FcFaq } from "react-icons/fc";
import Image from "next/image";

// Define the type for the props

export const HomeIcon = () => {
  return <Image src="/icons/home.svg" width={16} height={15.75} alt="T" />;
};
export const QuestionBoxIcon = () => {
  return <Image src="/icons/questionBox.svg" width={24} height={24} alt="T" />;
};
export const DownloadIcon =()=>{
  return <Image src="/icons/download.svg" width={16} height={15.75} alt="T" />;
}
export const ChannelIcon = () => {
  return <Image src="/icons/channel.svg" width={16} height={15.75} alt="T" />;
};
export const ChatIcon = () => {
  return <Image src="/icons/chat.svg" width={20} height={20} alt="T" />;
};

export const ToolsIcon = () => {
  return <Image src="/icons/tools.svg" width={24} height={24} alt="T" />;
};
export const OverviewIcon = () => {
  return <Image src="/icons/overview.svg" width={22} height={14} alt="T" />;
};

export const EMPAIcon = () => {
  return <Image src="/EMPA.svg" width={24} height={24} alt="E" />;
};

export const FAQIcon = () => {
  return (
    <span className=" filter grayscale contrast-200  text-xl ">
      {" "}
      <HiChatBubbleLeftRight color="#6A6B67" />
    </span>
  );
};

export const AnalysisIcon = () => {
  return <Image src="/icons/analysis.svg" width={20} height={16} alt="T" />;
};

export const RegulatoryIcon = () => {
  return (
    <Image src="/icons/regulatory.svg" width={21.75} height={22} alt="T" />
  );
};

export const MethodologyIcon = () => {
  return <Image src="/icons/methodology.svg" width={20} height={21} alt="T" />;
};

export const AssessmentIcon = () => {
  return <Image src="/icons/assessment.svg" width={18} height={18} alt="T" />;
};

export const InsightIcon = () => {
  return <Image src="/icons/insights.svg" width={22} height={13} alt="T" />;
};

export const RecommendationIcon = () => {
  return (
    <Image src="/icons/recommendation.svg" width={20} height={20} alt="T" />
  );
};
export const UnlockIcon = () => {
  return (
    <span>
      <FaUnlockAlt color="#333530" />
    </span>
  );
};

export const LockIcon = () => {
  return (
    <span>
      <FaLock color="#333530" />
    </span>
  );
};

export const AppsIcon = () => {
  return (
    <span>
      <AiFillAppstore color="#333530" />
    </span>
  );
};

export const EditIcon = () => {
  return (
    <span>
      <LuPencil />
    </span>
  );
};

export const RefreshIcon = () => {
  return (
    <span>
      <SlReload />
    </span>
  );
};

export const AddPersonIcon = () => {
  return (
    <span>
      <BsPersonPlus />
    </span>
  );
};

export const StackIcon = () => {
  return (
    <span>
      <GoStack />
    </span>
  );
};

export const ShareIcon = () => {
  return (
    <span>
      <IoShareSocialOutline />
    </span>
  );
};
