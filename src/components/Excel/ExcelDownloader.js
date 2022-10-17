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
    nodesData,
    relationsData,
    fileName
}) {
    /**
     * Obtener ExcelSheet para la tabla
     * de nodos
     * @returns componente ExcelSheet
     */
    const getNodeSheet = () => {
        return (
                <ExcelSheet
                    data={nodesData}
                    name="Nodos"
                >
                    <ExcelColumn label="ID" value="id" />
                    <ExcelColumn label="Nombre" value="name" />
                    {/* <ExcelColumn label="Es Interfaz?" value="isInterface" />
                    <ExcelColumn label="Es Abstracto?" value="isAbstract" /> */}
                    <ExcelColumn label="Modulo" value="module" />
                    {/* <ExcelColumn label="Propiedas Completas" value="incomompleteProperties" /> */}
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
                data={relationsData}
                name="Relaciones"
            >
                <ExcelColumn label="ID" value="id" />
                <ExcelColumn label="Origen" value="source" />
                <ExcelColumn label="Destino" value="target" />
                <ExcelColumn label="Relación" value="relation" />
                <ExcelColumn label="Acoplamiento" value="coupling" />
                <ExcelColumn label="Abstraccion" value="abstractness" />
                <ExcelColumn label="Instabilidad" value="instability" />
                <ExcelColumn label="DMS" value="dms" />
                <ExcelColumn label="Semejanza del Nombre" value="nameRessemblance" />
                <ExcelColumn label="Manejo de Paquete" value="packageMapping" />
            </ExcelSheet>
        )
    }
    
    return (
        <ExcelFile 
            filename={fileName}
            element={<MenuItem>Descargar Excel</MenuItem>}
        >
            { getNodeSheet() }
            { getRelationSheet() }
        </ExcelFile>
    )
}

export default Excel;
