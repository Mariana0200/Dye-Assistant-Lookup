import dyes from "../data/SPE & SP8 Dye Manager Database.json";

function Results({ searchTerm = "" }) {
  const normalizedSearchTerm = String(searchTerm).trim().toLowerCase();

  const filteredDyes = normalizedSearchTerm
    ? dyes.slice(1).filter((dye) => {
        const dyeName = String(dye?.["__EMPTY"] ?? "").toLowerCase();
        return dyeName.includes(normalizedSearchTerm);
      })
    : [];

  return (
    <div className="results">
      {normalizedSearchTerm && filteredDyes.length === 0 ? (
        <p>No matching dyes found.</p>
      ) : null}

      {filteredDyes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Dye</th>
              <th>Compatible Microscopes</th>
              <th>Excitation (nm)</th>
              <th>Emission (nm)</th>
            </tr>
          </thead>

          <tbody>
            {filteredDyes.map((dye, index) => (
              <tr key={`${dye["__EMPTY"]}-${index}`}>
                <td>{dye["__EMPTY"]}</td>
                <td>{dye["__EMPTY_1"]}</td>
                <td>{dye[""]}</td>
                <td>{dye["__EMPTY_2"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default Results;
