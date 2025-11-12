import { useState } from 'react'
import './App.css'
import { StatesProvider } from './Context'
import GameScreen from './components/GameScreen'

function App() {

  return (
    <>
      <StatesProvider >
        <main className='flex items-center justify-center h-screen'>
          <GameScreen />
        </main>
      </StatesProvider>
    </>
  )
}

export default App
