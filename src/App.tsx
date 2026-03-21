import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import { activityReducer, initialState} from "./reducers/ActivityReducer"
import ActivityList from "./components/ActivityList"
import CalorieTraker from "./components/CalorieTraker"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])

  const restarApp = useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center"> 
          <h1 className="text-center text-lg font-bold text-white uppercase"> contador de calorias</h1>
          <button className="bg-gray-800 hover:bg-gray-500 p-3.5 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
          disabled={!restarApp}
          onClick={() => dispatch({type: 'restar-activitys'})}
          >Reinicar app</button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-3xl font-black uppercase mb-2">Formulario</p>
        </div>
        <Form
          dispatch={dispatch}
          state={state}

        />
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTraker
          activities={state.activities}
          
          />
        </div>

      </section>

      <section className="p-10 mx-auto max-w-4xl">

        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />

      </section>
    </>
  )
}

export default App
