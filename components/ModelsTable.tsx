"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/types/supabase";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { modelRowWithSamples } from "@/types/utils";

type ModelsTableProps = {
  models: modelRowWithSamples[];
};

export default function ModelsTable({ models }: ModelsTableProps) {
  const router = useRouter();
  const handleRedirect = (id: number) => {
    router.push(`/overview/models/${id}`);
  };

  return (
    <div className="rounded-xl border border-border bg-white dark:bg-zinc-900 shadow-md overflow-hidden">
      <Table className="w-full text-sm">
        <TableHeader className="bg-zinc-100 dark:bg-zinc-800">
          <TableRow>
            <TableHead className="text-zinc-700 dark:text-zinc-300">Name</TableHead>
            <TableHead className="text-zinc-700 dark:text-zinc-300">Status</TableHead>
            <TableHead className="text-zinc-700 dark:text-zinc-300">Type</TableHead>
            <TableHead className="text-zinc-700 dark:text-zinc-300">Samples</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models?.map((model) => (
            <TableRow
              key={model.modelId}
              onClick={() => handleRedirect(model.id)}
              className="cursor-pointer h-16 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              <TableCell className="font-medium text-zinc-800 dark:text-zinc-100">{model.name}</TableCell>
              <TableCell>
                <Badge
                  className={`flex gap-2 items-center w-min ${
                    model.status === "finished" ? "bg-blue-600 text-white" : "bg-zinc-700 text-white"
                  }`}
                >
                  {model.status === "processing" ? "training" : model.status}
                  {model.status === "processing" && (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  )}
                </Badge>
              </TableCell>
              <TableCell className="text-zinc-700 dark:text-zinc-300">{model.type}</TableCell>
              <TableCell>
                <div className="flex gap-2 items-center">
                  {model.samples.slice(0, 3).map((sample) => (
                    <Avatar key={sample.id}>
                      <AvatarImage src={sample.uri} className="object-cover" />
                      <AvatarFallback>+</AvatarFallback>
                    </Avatar>
                  ))}
                  {model.samples.length > 3 && (
                    <Badge
                      className="rounded-full h-8 w-8 flex items-center justify-center border dark:border-zinc-600 text-sm"
                      variant="outline"
                    >
                      +{model.samples.length - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}