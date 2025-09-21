import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

const DeleteCollaboratorConfirmationDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">Remove Collaborator</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove Amina Musa from this event? They
            will lose access to all event data and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-4 w-full">
            <Button className="flex-1 !py-2 px-4 bg-black/40 border border-gray-300 rounded-md text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </Button>
            <Button className="flex-1 !py-2 px-4 bg-red-600 border border-transparent rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Remove
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCollaboratorConfirmationDialog;
