import React from "react";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import ResumeBuilding from "@/components/ResumeBuilding";

const resumebuilder = async () => {
  const session = await auth();

  if (!session?.user && !session) {
    redirect("/");
  }

  return (
    <div>
      <ResumeBuilding />
    </div>
  );
};

export default resumebuilder;
