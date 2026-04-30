import { ItemList } from "@/features/evaluation-template/components/ItemList";
import { Item } from "./components/CreateItemDialog";
import React from "react";
import { Button } from "@mui/material";
import { useCreateItem } from "./hooks/useCreateItem";
import { create } from "zustand";
import { createItem } from "./api/items.api";

const DUMMY_ITEMS = [
  {
    name: "Project Alpha Requirements",
    files: ["specifications.pdf", "user_stories.docx"],
  },
  {
    name: "Design Assets Q3",
    files: ["logo_v2.png", "brand_guidelines.pdf", "banner_ad.psd"],
  },
  {
    name: "Meeting Notes - Technical Review",
    files: ["minutes_10_24.txt"],
  },
  {
    name: "Empty Folder Example",
    files: [],
  }
];

export const ItemPage = () => {
  const [openDialog, setOpenDialog] = React.useState(false);

    

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Items Library</h1>
        <p className="text-gray-500 mt-2">Administra Items y evidencias asociadas.</p>
      </div>

      <Button variant="contained" onClick={() => setOpenDialog(true)}>Crear Item</Button>
      
      <ItemList items={DUMMY_ITEMS} />
      <Item open={openDialog} onClose={() => setOpenDialog(false)}></Item>
    </div>
  );
};
