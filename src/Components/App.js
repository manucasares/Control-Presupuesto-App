import React, { useState, useEffect } from 'react';
import { Context } from './Context';
import { IngresoPresupuesto } from './IngresoPresupuesto';
import { ControlPresupuesto } from './ControlPresupuesto';
import { useForm } from '../Hooks/useForm';


function App() {

    
    const [{presupuesto, monto, gasto}, handleInputChange, reset, setFormValues] = useForm({
        presupuesto : '',
        monto : '',
        gasto : ''
    })
    
    const initialState = JSON.parse(localStorage.getItem('presupuestos')) || { presupuestoTotal : presupuesto, presupuestoRestante : presupuesto }

    const [presupuestos, setPresupuestos] = useState(initialState);
    const {presupuestoTotal} = presupuestos;
     
    useEffect(() => {
        localStorage.setItem('presupuestos', JSON.stringify(presupuestos));
    }, [presupuestos]);

    const [component, setComponent] = useState(false);

    useEffect(() => {
        setPresupuestos(JSON.parse(localStorage.getItem('presupuestos')));

        if(presupuestoTotal !== ''){
            setComponent(true);
        }

    }, []);


    return (
 
        <Context.Provider value = {{
            //valores de formulario
            presupuesto, monto, gasto,
            handleInputChange, reset, setFormValues,
            //-------------------------------------
            presupuestos, setPresupuestos, setComponent    
        }}>
        
            <h1 className="text-center text-light">Controlador de Presupuesto</h1>
            
            {   
                component 
                ?  
                <ControlPresupuesto /> 
                :
                <IngresoPresupuesto />
            }

        
        </Context.Provider>
 
  );
}

export default App;
