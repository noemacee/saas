import { WorkflowFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type Props = {
  title?: string;
  subtitle?: string;
};

const Workflowform = ({ title, subtitle }: Props) => {
  const form = useForm<z.infer<typeof WorkflowFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(WorkflowFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const isLoading = form.formState.isLoading;
  const router = useRouter();

  return (
    <Card className="w-full max-w-[650px] border-none">
      {title && subtitle && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
      )}
    </Card>
  );
};

export default Workflowform;
