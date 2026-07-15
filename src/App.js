import './App.css';
import Header from './components/header';

function App() {
  return (
    <div className="App">
 <Header />

<main className="main-content">
  <div className="glass-panel">
    <h1>Confocal Microscope Dye Availability Finder</h1>
    <p>
      Search for fluorescent dyes and view their compatibility with our
      confocal microscopes.
    </p>
  </div>
</main>
</div>
);
}

export default App;
