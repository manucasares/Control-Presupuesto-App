import React, { useState, useContext, useEffect } from 'react'
import { Context } from './Context';

export const ControlPresupuesto = () => {

    const {gasto, monto, handleInputChange, setFormValues, presupuestos, setPresupuestos} = useContext(Context);
    
    const {presupuestoTotal, presupuestoRestante} = presupuestos;

    const initialGastos = JSON.parse(localStorage.getItem('gastos')) ||  [];

    const [gastos, setGastos] = useState(initialGastos);

    const [validation, setValidation] = useState(false)


    
    useEffect(() => {
       localStorage.setItem('gastos', JSON.stringify(gastos));
    }, [gastos]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if(!+monto || !monto || Number(monto) <= 0){
            console.log(monto);
            setValidation(true);
            return;
        }

        setValidation(false);

        setGastos([
            ...gastos,
            {
                id : new Date().getTime(),
                gasto,
                monto
            }
        ]);

        setPresupuestos(p => {return {
            ...p,
            presupuestoRestante : presupuestoRestante - monto
        }})

        setFormValues( p => {return{
            ...p,
            gasto : "",
            monto : ""
        }})
    }

    const handleClear = () => {
        localStorage.clear();
        window.location.href = window.location.href;
        return false;
    }

    const handleDelete = (id, monto) => {
        setGastos(gastos.filter( gasto => gasto.id !== id));
        setPresupuestos( p => { return {
            ...p,
            presupuestoRestante : Number(presupuestoRestante) + Number(monto)
        }})
    }

    return (
        <div className="row container bg-white p-3">

            <div className="col-6">
                <h2 className="text-center text-dark">Agrega tus gastos aquí</h2>

                { 
                    validation 
                    && 
                    (
                        <p className='bg-danger text-white text-center p-1 mt-2 mb-2'>
                            Datos incorrectos.<br/>
                            Reintente nuevamente.
                        </p>
                    ) 
                } 

                <form>
                    <p className="text-secondary mb-2">Gasto:</p>
                    <input
                        onChange={handleInputChange}
                        name = "gasto"
                        value = {gasto}
                        className="form-control mb-3"
                        placeholder="Comida, Electrodoméstico..."
                        autoComplete="off"
                     />


                    <p className="text-secondary mb-2">Monto:</p>
                    <input
                        onChange={handleInputChange}
                        name = "monto"
                        value = {monto}
                        className="form-control"
                        placeholder="Ej: 500"
                        autoComplete="off"
                    />
                    <button 
                            onClick={handleSubmit}
                            className="btn btn-outline-primary btn-block mt-2"
                    >
                        Agregar gasto
                    </button>
                    <button 
                            onClick={handleClear}
                            className="btn btn-danger btn-block mt-2"
                    >
                        Borrar presupuesto
                    </button>
                </form>
                
            </div>


            <div className="col-6">

                <h2 className="text-center text-dark mb-3">Listado</h2>


                <div>
                    <p className="listado-item align-items-center mt-3 mb-1">
                        Presupuesto inicial: ${presupuestoTotal}
                    </p>
    
                    <p className="listado-item align-items-center">Restante: ${presupuestoRestante}</p>
                </div>

                {
                    gastos.map(({id, gasto, monto}) => (
                        <div key = {id}>
                            <div  className='d-flex justify-content-between align-items-center mb-1 gasto-item'>
                                <h6>
                                    <span className='gasto'>{gasto}:</span>
                                    <span className='monto text-muted'>${monto}</span>
                                </h6>
                                <button className='btn btn-danger'
                                        onClick ={() => handleDelete(id, monto)}
                                >
                                        Borrar
                                </button>
                            </div>
                            <hr />
                        </div>

                    ))
                }

            </div>

           
        </div>
    )
}
