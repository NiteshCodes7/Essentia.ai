import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";


const DeleteButton = ({ id, onDelete } : { id : string; onDelete : (id: string) => void }) => {
  const[open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setOpen(true);

      const res = await axios.post("/api/delete-summary",
        { id }
      );

    if(res.status === 200){
      onDelete(id);
      toast( res?.data?.message || "Success", {
        description: "✅ Summary deleted successfully!",
      });
    }

    } catch (error) {
      console.log("Error deleting the summary", error);
      toast("Error", {
        description: "❌ Error deleting summary!"
      });

    }finally{
      setOpen(false);
    }
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-white hover:bg-rose-500"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary?</DialogTitle>
          <DialogDescription>
            Are you sure to delete this summary? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
          variant={"ghost"}
          className="bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button
          variant={"destructive"}
          className="bg-gray-900 hover:bg-gray-600"
          onClick={handleDelete}
        >
          Delete
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
