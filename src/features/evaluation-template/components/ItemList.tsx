import { Item } from "./CreateItemDialog";
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetItems } from "../hooks/useGetItems";
import { useCreateItem } from "../hooks/useCreateItem";


interface Data {
  id: number,
  name: string,
  version: string,
  enabled: boolean
}

function createData(
  id: number,
  name: string,
  version: string,
  enabled: boolean
): Data {
  return {
    id,
    name,
    version,
    enabled,
  };
}

type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nombre',
  },
  {
    id: 'version',
    numeric: false,
    disablePadding: false,
    label: 'Versión',
  },
  {
    id: 'enabled',
    numeric: false,
    disablePadding: false,
    label: 'Habilitado',
  }
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

// Configura la cebecera de la tabla
function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } =
    props;

  return (
    <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{
              input: { 'aria-label': 'select all desserts' },
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

// Configura la barra de acción para los elementos seleccionados
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            color: 'inherit',
            flex: '1 1 100%',
          }}
        >
          {numSelected} selected
        </Typography>
      ) : (
        <div></div>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div></div>
      )}
    </Toolbar>
  );
}

export interface ItemData {
  name: string;
  files: string[];
}

interface ItemListProps {
  items: ItemData[];
}

// Método principal
export const ItemList = ({ items }: ItemListProps) => {

  const { data, isLoading, error } = useGetItems();

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Obtiene los items de la API
  const rowsData = data?.data?.data || [];
  const totalItems = rowsData.length;

  // Divide los items entre el numero que se especifique para mostrarlos en la tabla
  const visibleRows = React.useMemo(() => {
    return rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rowsData, page, rowsPerPage]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalItems) : 0;

  // Muestra un texto en lo que se obtienen los datos desde la API
  if (isLoading) {
    return (
      <Box sx={{ width: '100%', p: 4, textAlign: 'center' }}>
        <Typography color="textSecondary">Cargando datos...</Typography>
      </Box>
    );
  }

  // Avisa si no se pudieron cargar los datos de la API
  if (error) {
    return (
      <Box sx={{ width: '100%', p: 4, textAlign: 'center' }}>
        <Typography color="error">Error al cargar los ítems. Inténtalo de nuevo.</Typography>
      </Box>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="w-full p-10 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">No items available</p>
        <p className="text-gray-400 text-sm mt-1">Add some items to see them here.</p>
      </div>
    );
  }

  // Se encarga de la opcion de seleccionar todos los elementos de la tabla
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = visibleRows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Aqui se construye la tabla
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2, borderRadius: '12px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          {selected.length > 0 && (
            <EnhancedTableToolbar numSelected={selected.length} />
          )}
          
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={visibleRows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = selected.includes(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover onClick={(event) => handleClick(event, row.id)} key={row.id} selected={isItemSelected}  sx={{ cursor: 'pointer', }} >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} slotProps={{ input: {'aria-labelledby': labelId}, }} />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.version_name}
                      </TableCell>
                      <TableCell align="left">{row.version}</TableCell>
                      <TableCell align="left">{row.enabled ? 'true' : 'false'}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{}}>
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rowsData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Placeholder for the updated Item dialog usage, items is now just an array of data, you may want to open the dialog upon user action. For now, comment it out to avoid errors. */}
        {/* {items.map((item, index) => (
          <Item key={index} open={false} onClose={() => {}} initialName={item.name} />
        ))} */}
      </div>
    </div>
    
  );
};
