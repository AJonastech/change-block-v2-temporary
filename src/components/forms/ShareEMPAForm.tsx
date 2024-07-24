"use client";

import { useState } from "react";
import { Avatar, Input, Button } from "@nextui-org/react";
import { Link } from "iconsax-react";

const ShareEMPAForm = () => {
  const [email, setEmail] = useState("");
  const [collaborators, setCollaborators] = useState([
    {
      name: "Dorathy Aphonso",
      email: "dorathy@example.com",
      role: "Owner",
      image: "/assets/dorathy.png",
    },
    {
      name: "Mary Green",
      email: "mary@example.com",
      role: "Editor",
      image: "/assets/emmanuelle.svg",
    },

    {
      name: "Rose Milner",
      email: "rose@example.com",
      role: "Editor",
      image: "/assets/rose.svg",
    },
    {
      name: "Martinez Emi",
      email: "martinez@example.com",
      role: "Reviewer",
      image: "/assets/martinez.svg",
    },
    {
      name: "Phil Oceans",
      email: "phil@example.com",
      role: "Editor",
      image: "/assets/dorathy.png",
    },
    {
      name: "Mary Green",
      email: "mary@example.com",
      role: "Editor",
      image: "/assets/emmanuelle.svg",
    },
    {
      name: "Marcus Alonso",
      email: "marcus@example.com",
      role: "Reviewer",
      image: "/assets/martinez.svg",
    },

    {
      name: "Phil Oceans",
      email: "phil@example.com",
      role: "Editor",
      image: "/assets/dorathy.png",
    },
    {
      name: "Emmanuelle Gates",
      email: "emmanuelle@example.com",
      role: "Reviewer",
      image: "/assets/emmanuelle.svg",
    },
    {
      name: "Marcus Alonso",
      email: "marcus@example.com",
      role: "Reviewer",
      image: "/assets/martinez.svg",
    },
  ]);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleAddCollaborator = () => {
    if (email) {
      setCollaborators([
        ...collaborators,
        {
          name: email,
          email,
          role: "Editor",
          image: "https://via.placeholder.com/150",
        },
      ]);
      setEmail("");
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 bg-white rounded py-8">
      <div className="flex px-8 pb-0 justify-between items-center">
        <h6 className="font-semibold heading-h6 text-grey-700">Share</h6>
      </div>
  
      <div className="flex flex-col gap-4 px-8">
        <Input
          label="Share to Address"
          placeholder="Enter Email Address"
          type="text"
          value={email}
          onChange={handleEmailChange}
          className="placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-100 placeholder:text-[18px] placeholder:leading-[25.2px] placeholder:font-bold border-[1.5px] rounded-lg"
          classNames={{
            label:
              " !font-semibold    font-satoshi !text-grey-500 pb-4 !text-lg leading-[25.2px]",
            input: ["bg-transparent"],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "bg-transparent border-[1px] !h-20 py-5 px-8 border-0",
            ],
          }}
          variant="bordered"
          labelPlacement="outside"
        />
      </div>
      <div className="flex flex-col gap-3 px-8">
        <label className=" font-semibold   font-satoshi text-grey-500 text-lg leading-[25.2px]">
          Share to Messages
        </label>
        <ul className="grid max-w-[600px] grid-rows-2 grid-flow-col gap-4 overflow-hidden">
          {collaborators.map((collaborator, index) => (
            <li
              key={index}
              className="flex w-[fit] flex-col justify-center items-center cursor-pointer group "
            >
              <Avatar
                size="lg"
                className="size-[52px] group-hover:scale-[103%] transition-all duration-200"
                src={collaborator.image}
                alt={collaborator.name}
              />
              <span className=" text-grey-700 font-satoshi text-lg group-hover:underline transition-all duration-200">
                {collaborator.name.split(" ")[0]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShareEMPAForm;

