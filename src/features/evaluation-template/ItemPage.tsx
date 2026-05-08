import { ItemList } from "@/features/evaluation-template/components/ItemList";
import { Item } from "./components/CreateItemDialog";
import React from "react";
import FooterDev from "@/components/FooterDev";
import { Button } from "@mui/material";
import { useCreateItem } from "./hooks/useCreateItem";
import { create } from "zustand";
import { createItem } from "./api/items.api";
import { Box } from "lucide-react";

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
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-blue-100 to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Items</h1>
          <p className="text-gray-500 mt-2">Administra Items y evidencias asociadas.</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <Button 
              variant="contained" 
              onClick={() => setOpenDialog(true)}
              sx={{
                backgroundColor: '#000000', 
                borderRadius: '8px',       
                textTransform: 'none',  
                fontWeight: 'bold',
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: '#2f2f30', // Color al pasar el mouse
                },
                mb: 3
              }}
          >Crear Item</Button>
          
          <ItemList items={DUMMY_ITEMS} />
          <Item open={openDialog} onClose={() => setOpenDialog(false)}></Item>
        </div>
      </section>
    </div>
  );
};
