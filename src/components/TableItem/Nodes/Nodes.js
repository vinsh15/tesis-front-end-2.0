import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Nombre', width: 130 }

];

const rows = [
  { id: 1, name: 'Jon'},
  { id: 2, name: 'Lannister'},
  { id: 3, name: 'Lannister'},
  { id: 4, name: 'Stark'},
  { id: 5, name: 'Targaryen'},
  { id: 6, name: 'Melisandre'},
  { id: 7, name: 'Clifford'},
  { id: 8, name: 'Frances'},
  { id: 9, name: 'Roxie'},
];

function NodesTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
    </div>
  );
};

export default NodesTable;