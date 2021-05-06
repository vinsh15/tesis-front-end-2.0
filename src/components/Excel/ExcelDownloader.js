import React from 'react';
import ReactExport from 'react-export-excel';

import MenuItem from "@material-ui/core/MenuItem";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

/**
 * Componente para descargar el grafo
 * en formato de archivo Excel
 */
function Excel({
    type,
    data,
    fileName
}) {

    /**
     * Establecer el tipo de sheet a utilizar
     * @returns componente ExcelSheet
     */
    const setSheet = () => {
        switch (type) {
            case "nodes":
                return getNodeSheet();
            default:
                return getRelationSheet();
        }
    }

    /**
     * Obtener ExcelSheet para la tabla
     * de nodos
     * @returns componente ExcelSheet
     */
    const getNodeSheet = () => {
        return (
                <ExcelSheet
                    data={data}
                    name="Nodos"
                >
                    <ExcelColumn label="ID" value="id" />
                    <ExcelColumn label="Nombre" value="name" />
                </ExcelSheet>
        )
    }

    /**
     * Obtener ExcelSheet para la tabla
     * de relaciones
     * @returns componente ExcelSheet
     */
    const getRelationSheet = () => {
        return (
            <ExcelSheet
                data={data}
                name="Relaciones"
            >
                <ExcelColumn label="ID" value="id" />
                <ExcelColumn label="Origen" value="source" />
                <ExcelColumn label="Destino" value="target" />
                <ExcelColumn label="Relación" value="relation" />
            </ExcelSheet>
        )
    }
    
    return (
        <ExcelFile 
            filename={fileName}
            element={<MenuItem>Descargar Excel</MenuItem>}
        >
            { setSheet() }
        </ExcelFile>
    )
}

export default Excel;
