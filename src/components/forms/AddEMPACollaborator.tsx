"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { BiChevronDown } from "react-icons/bi";
import useReportStepsStore from "@/store/useReportStepsStore";
import usePost from "@/hooks/usePostData";
import { inviteUserToEmpa } from "@/actions/EmpaActions";
import { toast } from "react-toastify";

const roles = ["Owner", "Editor", "Reviewer", "Remove"];

const AddCollaborator = ({ reportId }: { reportId: string }) => {
  const [email, setEmail] = useState("");
  const { users } = useReportStepsStore();

  const handleRoleChange = (index: number, role: string) => {
    // Handle role change logic here
  };

  const handleInviteSuccess = (data: any) => {
    toast.success(data.details);
  };

  const { mutate: handleInviteUser, isPending: isInvitingUser, isError, error } = usePost({
    handleSuccess: handleInviteSuccess,
    mutateFn: (data: { user_email: string; role: string }) =>
      inviteUserToEmpa(reportId, data),
  });

  const inviteUser = async () => {
    if (validateEmail(email)) {
      handleInviteUser({
        user_email: email,
        role: "REVIEWER",
      });
      setEmail(""); // Clear the email input after sending the invite
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  const validateEmail = (email: string) => {
    const re =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.message);
    }
  }, [isError]);

  return (
    <div className="w-full flex flex-col gap-8 pb-8 bg-white rounded">
      <div className="flex justify-between items-center border-b">
        <h6 className="font-semibold heading-h6 text-grey-700  p-8">
          Add Collaborator
        </h6>
      </div>
      <div className="flex gap-x-3 px-8">

        <Input
          placeholder="Enter Email Address"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

          className="placeholder:text-lg placeholder:font-satoshi placeholder:text-grey-100 !text-grey-100 placeholder:text-[18px] placeholder:leading-[25.2px] placeholder:font-bold"
          classNames={{
            input: ["bg-transparent !text-grey-100"],
            innerWrapper: "bg-transparent !text-grey-100 ",
            inputWrapper: ["bg-transparent !text-grey-100 border-[1px] py-5 px-8"],
          }}
          variant="bordered"
        />

        <Button
          className="!bg-primary text-white"
          onClick={inviteUser}
          isLoading={isInvitingUser}
          isDisabled={!validateEmail(email) || isInvitingUser} // Disable button if email is invalid
        >
          {isInvitingUser ? "Inviting..." : "Invite"}
        </Button>
      </div>
      <ul className=" flex flex-col gap-4 ">
        {users.map((user, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-8 hover:bg-gray-100 transition-all duration-200"
          >
            <div className="flex items-center">
              <Avatar
                size="lg"
                className="size-[52px]"
                src={user.user.profile_image}
                alt={user.user.full_name}
              />
              <span className="ml-4 text-grey-700 font-bold text-lg">
                {user.user.full_name}
              </span>
            </div>
            {user.role === "OWNER" ? (
              <span className="border capitalize rounded-md px-4 py-1">
                {user.role}
              </span>
            ) : (
              <Dropdown>
                <DropdownTrigger className="border rounded-lg px-4 py-1 cursor-pointer">
                  <div className="flex gap-1 items-center">
                    <span className=""> {user.role}</span>{" "}
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
