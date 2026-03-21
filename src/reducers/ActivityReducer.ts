import type { Activity } from "../types"

export type ActivityActions = 
    {  type : 'save-activity', payload: {newActivity : Activity}} |
    {  type : 'set-setActiveId', payload: {id : Activity['id']}} |
    {  type : 'deleted-activity', payload: {id : Activity['id']}} |
    {  type : 'restar-activitys'} 

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivites = () : Activity[] =>{

    const activities =  localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
} 

export const initialState : ActivityState = {
    activities: localStorageActivites(),
    activeId: ''
}

export const activityReducer = (

    state : ActivityState = initialState,
    action : ActivityActions

) => {

    if(action.type === 'save-activity'){

        let updatedActivity : Activity[] = []
        if(state.activeId){
            updatedActivity = state.activities.map(actvivity => actvivity.id === state.activeId ? action.payload.newActivity : actvivity )
        }else{
            updatedActivity = [...state.activities, action.payload.newActivity]
        }
        //actulizar el state
        return {
            ...state,
            activities: updatedActivity,
            activeId: ''
        }
    }

    if(action.type === 'set-setActiveId'){
        
        return{
            ...state, activeId: action.payload.id
        }
    }

    if (action.type === 'deleted-activity'){

        return {
            ...state,
            activities: state.activities.filter(activity => activity.id != action.payload.id)
        }
    }

    if(action.type === 'restar-activitys'){
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}