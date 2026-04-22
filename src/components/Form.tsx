
import { useState, useEffect } from "react"
import { v4 as uuidv4} from 'uuid'
import { categories } from "../data/categories"
import type { Activity } from "../types"
import {useActivity} from '../hook/useActivity'


const initialState : Activity = ({
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
})
export default function Form() {
    const { state, dispatch } = useActivity()
    const [activity, setActivity] = useState<Activity>(initialState)
    
    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.find(
                stateActivity => stateActivity.id === state.activeId
            )
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if(selectedActivity) setActivity(selectedActivity)
        }
    }, [state.activeId, state.activities])

    const handleOnchange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {

        setActivity({
            ...activity,
            [e.target.id]: e.target.id === 'category' || e.target.id === 'calories'
                ? +e.target.value
                : e.target.value
        })
    }

    const isValydActivity = () => {
        const {name, calories} = activity
        return name.trim() !== '' && calories > 0
    }
    const handleSubmit = (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({type : 'save-activity', payload: {newActivity: activity}})
        setActivity({
        ...initialState,
            id: uuidv4()
        }    
        )
    }

    return (
        <>
        <form className="space-y-5 bg-white shadow p-10 rounded-lg "
        onSubmit={handleSubmit}
        > 
            
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria: </label>
                <select 
                id="category" 
                className=" border border-slate-300 p-2 rounded-lg w-full bg-white" 
                value={activity.category}
                onChange={handleOnchange}
                >
                    {categories.map(category =>( 
                        <option
                        key={category.id}
                        value={category.id}
                        >

                        {category.name}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad: </label>
                <input id="name" 
                type= "text" 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                placeholder="Ej: Hamburguesa, Ejercicio, Correr, Pollo, Jugo"
                value={activity.name}
                onChange={handleOnchange}
                />

            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calories: </label>
                <input id="calories"
                type= "number" 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                placeholder="Calorias - 300/500"
                value={activity.calories}
                onChange={handleOnchange}
                />

            </div>
            <input type="submit" 
            className="bg-gray-800 font-bold uppercase hover:bg-gray-900 w-full p-3 rounded-lg text-white  cursor-pointer disabled:opacity-10" 
            value={activity.category === 1 ? 'guardar comida' : 'guardar ejecicio'} 
            disabled={!isValydActivity()}
            />
        </form>
        </>
    )
}
