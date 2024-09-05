import Quiz from "@/components/Quiz";
import React from "react";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";

const quiz = async () => {
  const session = await auth();

  if (!session?.user && !session) {
    redirect("/");
  }

  return (
    <div>
      <Quiz />
    </div>
  );
};

export default quiz;
