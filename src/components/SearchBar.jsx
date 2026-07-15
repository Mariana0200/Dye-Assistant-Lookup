function SearchBar({ searchTerm = "", setSearchTerm }) {
  const handleChange = (event) => {
    if (typeof setSearchTerm === "function") {
      setSearchTerm(event.target.value);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        placeholder="Search by dye name..."
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
