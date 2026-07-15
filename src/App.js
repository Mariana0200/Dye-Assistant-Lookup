import { useState } from "react";
import "./App.css";

import Header from "./components/header";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

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

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <Results searchTerm={searchTerm} />
        </div>
      </main>
    </div>
  );
}

export default App;
