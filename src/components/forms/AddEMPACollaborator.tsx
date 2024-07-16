"use client";

import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { BiChevronDown } from "react-icons/bi";

type Collaborator = {
  name: string;
  email: string;
  role: string;
  image: string;
};

const collaboratorsData: Collaborator[] = [
  {
    name: "Dorathy Aphonso",
    email: "dorathy@example.com",
    role: "Owner",
    image: "/assets/dorathy.png",
  },
  {
    name: "Emmanuelle Gates",
    email: "emmanuelle@example.com",
    role: "Reviewer",
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
];

const roles = ["Owner", "Editor", "Reviewer", "Remove"];

const AddCollaborator = () => {
  const [collaborators, setCollaborators] =
    useState<Collaborator[]>(collaboratorsData);
  const [email, setEmail] = useState("");

  const handleRoleChange = (index: number, role: string) => {
    const updatedCollaborators = [...collaborators];
    if (role === "Remove") {
      updatedCollaborators.splice(index, 1);
    } else {
      updatedCollaborators[index].role = role;
    }
    setCollaborators(updatedCollaborators);
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
    <div className="w-full flex flex-col gap-8 pb-8 bg-white rounded">
      <div className="flex justify-between items-center border-b">
        <h6 className="font-semibold heading-h6 text-grey-700  p-8">
          Add Collaborator
        </h6>
      </div>
      <div className="flex px-8">
        <Input
          placeholder="Enter Email Address"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-100 placeholder:text-[18px] placeholder:leading-[25.2px] placeholder:font-bold  "
          classNames={{
            input: ["bg-transparent"],
            innerWrapper: "bg-transparent ",
            inputWrapper: ["bg-transparent border-[1px] !h-20 py-5 px-8"],
          }}
          variant="bordered"
        />
      </div>
      <ul className=" flex flex-col gap-4 ">
        {collaborators.map((collaborator, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-8 hover:bg-gray-100 transition-all duration-200"
          >
            <div className="flex items-center">
              <Avatar
                size="lg"
                className="size-[52px]"
                src={collaborator.image}
                alt={collaborator.name}
              />
              <span className="ml-4 text-grey-700 font-bold text-lg">
                {collaborator.name}
              </span>
            </div>
            {collaborator.role === "Owner" ? (
              <span className="border rounded-md px-4 py-1">
                {collaborator.role}
              </span>
            ) : (
              <Dropdown>
                <DropdownTrigger className="border rounded-lg px-4 py-1 cursor-pointer">
                  <div className="flex gap-1 items-center">
                    <span className=""> {collaborator.role}</span>{" "}
                    <BiChevronDown color="#5B5D58" />
                  </div>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dropdown Variants"
                  classNames={{
                    base: "bg-grey-10",
                    emptyContent: "bg-grey-10",
                  }}
                  className="bg-grey-10"
                >
                  {roles.map((role) => (
                    <DropdownItem
                      key={role}
                      onClick={() => handleRoleChange(index, role)}
                    >
                      {role}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddCollaborator;
