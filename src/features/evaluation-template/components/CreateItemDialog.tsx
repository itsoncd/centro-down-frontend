import { useState, useCallback } from "react";
import { 
  Typography, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  TextField,
  Button
} from "@mui/material";
import { 
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  InsertDriveFile as FileIcon
} from "@mui/icons-material";
import { useCreateItem } from "../hooks/useCreateItem";

export interface ItemProps {
  open: boolean;
  onClose: () => void;
  initialName?: string;
}

export const Item = ({ open, onClose, initialName = "" }: ItemProps) => {
  const [name, setName] = useState(initialName);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { mutateAsync: createItem, isPending: createItemErrorisPending, error: createItemError } = useCreateItem();

  const handleCreateItem = async (event: any) => {
    await createItem( { name: name, version: "1.0", files: files })
    onClose()
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight={600}>
          Crear Item
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Archivos
          </Typography>
          <Box
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            sx={{
              border: '2px dashed',
              borderColor: dragActive ? 'primary.main' : 'divider',
              borderRadius: 2,
              display:'block',
              p: 4,
              textAlign: 'center',
              backgroundColor: dragActive ? 'action.hover' : 'background.default',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
                borderColor: 'primary.main'
              }
            }}
            component="label"
          >
            <input
              type="file"
              multiple
              hidden
              onChange={handleChange}
            />
            { <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} /> }
            { <Typography variant="body1" color="text.secondary">
              Arrastra archivos aquí o selecciona uno
            </Typography> }
          </Box>
          
          {files.length > 0 && (
            <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {files.map((file, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, overflow: 'hidden' }}>
                    <FileIcon color="action" />
                    <Typography variant="body2" noWrap>
                      {file.name}
                    </Typography>
                  </Box>
                  <IconButton size="small" onClick={() => removeFile(index)} color="error">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleCreateItem} disabled={!name}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

