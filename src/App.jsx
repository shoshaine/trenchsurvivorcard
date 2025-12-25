import { useState } from 'react'
import './App.css'
import CardGenerator from './components/CardGenerator'

function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <h1>Trenches Survivor Card</h1>
        <p className="subtitle">Official 2025 Pass Generation Protocol</p>
      </header>
      <main>
        <CardGenerator />
      </main>
      <footer className="main-footer">
        <p>Not financial advice. We are all gonna make it (maybe).</p>
      </footer>
    </div>
  )
}

export default App
