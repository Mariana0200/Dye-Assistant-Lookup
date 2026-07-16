import { useState } from "react";
import "./App.css";

import Header from "./components/header";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import SimilarDyeFinder from "./components/SimilarDyeFinder";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="App">
      <Header />

      <main className="main-content">
        <div className="glass-panel">
        <h1>
  {activeTab === "search"
    ? "Confocal Microscope Dye Availability Finder"
    : "Confocal Microscope Similar Dye Finder"}
</h1>

<p>
  {activeTab === "search"
    ? "Search for fluorescent dyes and view their compatibility with our confocal microscopes."
    : "Enter the excitation and emission values of your dye to find the five closest wavelength matches available on the system."}
</p>

          <div className="tab-buttons">
            <button
              type="button"
              className={activeTab === "search" ? "tab-button active" : "tab-button"}
              onClick={() => setActiveTab("search")}
            >
              Search Available Dyes
            </button>

            <button
              type="button"
              className={activeTab === "similar" ? "tab-button active" : "tab-button"}
              onClick={() => setActiveTab("similar")}
            >
              Find a Similar Dye
            </button>
          </div>

          {activeTab === "search" && (
            <>
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <Results searchTerm={searchTerm} />
            </>
          )}

          {activeTab === "similar" && <SimilarDyeFinder />}
        </div>
      </main>
    </div>
  );
}

export default App;