import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'source', headerName: 'Source', width: 150 },
  { field: 'target', headerName: 'Target', width: 150 },
  { field: 'relation', headerName: 'Relation', width: 150 }

];

const rows = [
  { id: 1, source: 'Jon', target: 'Lannister', relation: 'Extends'},
  { id: 2, source: 'Lannister', target: 'Stark', relation: 'Extends'},
  { id: 3, source: 'Lannister', target: 'Stark Junior', relation: 'Extends'},
  { id: 4, source: 'Stark', target: 'Mari', relation: 'Extends'},
  { id: 5, source: 'Targaryen', target: 'Lannister', relation: 'Extends'},
  { id: 6, source: 'Melisandre', target: 'Stark', relation: 'Implements'},
  { id: 7, source: 'Clifford', target: 'Lannister', relation: 'Implements'}
];

function EdgesTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};

export default EdgesTable;