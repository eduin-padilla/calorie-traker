import {  useEffect, useMemo } from "react"
import Form from "./components/Form"

import ActivityList from "./components/ActivityList"
import CalorieTraker from "./components/CalorieTraker"
import { useActivity } from "./hook/useActivity"

function App() {

  const {state, dispatch} = useActivity()

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])

  const restarApp = useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3 ">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-3 sm:flex-row sm:justify-between"> 
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
        />
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTraker

          />
        </div>

      </section>

      <section className="p-10 mx-auto max-w-4xl">

        <ActivityList

        />

      </section>
    </>
  )
}

export default App
