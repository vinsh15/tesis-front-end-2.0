import React from "react";
import "./inputs.css"

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { TextField } from "@material-ui/core";

import { Button } from '@material-ui/core';

import { useForm } from "react-hook-form"

const Inputs = () => {
  const classes = useStyles();
  const theme = useTheme();

  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='form-styles'>
        <div className='input'>
          <div className="input-align">
            <input
              className={errors.dms ? "input-errors" : "input-styles"}
              placeholder="Peso DMS"
              name="dms"
              {...register ("dms", {required: "Input is required",  pattern: {
                 value: /^[0-9]*$/,
                 message: "Only numbers are allowed",
               }})}
               onKeyUp={() => {
                trigger ( "dms")
              }}
              
          />
          {errors.dms && (<small className="validation-text">{errors.dms.message}</small> )}
          </div>
          <div className="input-align">
            <input
              className={errors.acloplamiento ? "input-errors" : "input-styles"}
              placeholder="Peso Acloplamiento"
              name="acloplamiento"
              {...register ("acloplamiento", {required: "Input is required",  pattern: {
                 value: /^[0-9]*$/,
                 message: "Only numbers are allowed",
               }})}
               onKeyUp={() => {
                trigger ( "acloplamiento")
              }}
              
          />
              {errors.acloplamiento && (<small className="validation-text">{errors.acloplamiento.message}</small> )}
          </div>
         <div className="input-align">
            <input
              className={errors.semejanza ? "input-errors" : "input-styles"}
              placeholder="Semejanza"
              name="semejanza"
              {...register ("semejanza", {required: "Input is required",  pattern: {
                 value: /^[0-9]*$/,
                 message: "Only numbers are allowed",
               }})}
               onKeyUp={() => {
                trigger ( "semejanza")
              }}
            />
             {errors.semejanza && (<small className="validation-text">{errors.semejanza.message}</small> )}
         </div>
          <div className="input-align">
            <input
                className={errors.paquete ? "input-errors" : "input-styles"}
                placeholder="Paquete"
                name="paquete"
                {...register ("paquete", {required: "Input is required",  pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed",
                }})}
                onKeyUp={() => {
                  trigger ( "paquete")
                }}
            />
             {errors.paquete && (<small className="validation-text">{errors.paquete.message}</small> )}
          </div>
        </div>
        <Button variant="contained" type="submit">
           Total
        </Button>
      </form>
    </>
  );
};

/** Creacion de capa de estilos para el componente */
const useStyles = makeStyles((theme) => ({
  inputs: {
    padding: theme.spacing(2),
  },
}));

export default Inputs;
