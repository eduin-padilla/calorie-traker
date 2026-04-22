import { type ReactNode, useReducer, createContext, useMemo } from "react";
import {type ActivityState, activityReducer, initialState, type ActivityActions} from "../reducers/ActivityReducer";
import { categories } from "../data/categories";
import type { Activity } from "../types";


type ActivityProviderProps = {
    children: ReactNode
}
type ActivityContextProps = {

    state: ActivityState
    dispatch: React.Dispatch<ActivityActions>
    caloriesConsumed: number
    caloriesBurned: number
    netCalories: number
    categoryName: (category: number) => string[]
    isEmptyActivies: boolean
}


// eslint-disable-next-line react-refresh/only-export-components
export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({children}: ActivityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    //contadores 
        const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0 ),[state.activities] )
        const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0 ),[state.activities] )
        const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesBurned, caloriesConsumed])

        const categoryName = useMemo(() => (category : Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''), [])

        const isEmptyActivies = useMemo(() => state.activities.length === 0, [state.activities])

    return (
        <ActivityContext.Provider value={{
            state,
            dispatch,
            caloriesConsumed,
            caloriesBurned,
            netCalories,
            categoryName,
            isEmptyActivies

        }}>
            {children}
        </ActivityContext.Provider>
    )
}