import React, { useState, useContext} from 'react';
import { Context } from './Context';

export const IngresoPresupuesto = () => {

    const context = useContext(Context);

    const {handleInputChange, presupuesto, setPresupuestos, setComponent} = context;
    
    const [validation, setValidation] = useState(false)

    const handleSubmit = (e) => {

        e.preventDefault();

        if(!+presupuesto || presupuesto.length < 2){
            setValidation(true);
            return;
        }

        setPresupuestos( p => {return {
            presupuestoTotal : presupuesto,
            presupuestoRestante  : presupuesto
        }})

        setComponent(true);
    }


    return (
        <div className="container bg-white p-3">
            { 
                validation 
                && 
                ( <p className='bg-danger text-white text-center p-1 mb-2'> Ingrese un presupuesto correcto. </p> ) 
            } 

            <form
                 onSubmit={handleSubmit}
            >
                <p className="text-secondary mb-2">Ingrese su presupuesto</p>
                <input
                    onChange={handleInputChange}
                    name = "presupuesto"
                    value = {presupuesto}
                    className="form-control"
                    placeholder="Ej: 1000"
                    autoComplete="off"
                />
            </form>
        </div>
    )
}



