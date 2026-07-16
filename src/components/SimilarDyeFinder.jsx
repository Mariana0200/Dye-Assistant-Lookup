import { useMemo, useState } from "react";
import dyes from "../data/SPE & SP8 Dye Manager Database.json";

function SimilarDyeFinder() {
  const [excitation, setExcitation] = useState("");
  const [emission, setEmission] = useState("");
  const [matches, setMatches] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const availableDyes = useMemo(() => {
    return dyes
      .slice(1)
      .map((dye) => ({
        name: String(dye?.["__EMPTY"] ?? "").trim(),
        microscopes: String(dye?.["__EMPTY_1"] ?? "").trim(),
        excitation: Number(dye?.[""]),
        emission: Number(dye?.["__EMPTY_2"]),
      }))
      .filter((dye) => {
        const isAvailable =
          dye.microscopes &&
          dye.microscopes.toLowerCase() !== "none";

        return (
          dye.name &&
          isAvailable &&
          Number.isFinite(dye.excitation) &&
          Number.isFinite(dye.emission) &&
          dye.excitation > 0 &&
          dye.emission > 0
        );
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredExcitation = Number(excitation);
    const enteredEmission = Number(emission);

    if (
      !Number.isFinite(enteredExcitation) ||
      !Number.isFinite(enteredEmission) ||
      enteredExcitation <= 0 ||
      enteredEmission <= 0
    ) {
      setErrorMessage(
        "Please enter valid positive numbers for both excitation and emission."
      );
      setMatches([]);
      setHasSearched(false);
      return;
    }

    const closestMatches = availableDyes
      .map((dye) => {
        const excitationDifference = Math.abs(
          dye.excitation - enteredExcitation
        );

        const emissionDifference = Math.abs(
          dye.emission - enteredEmission
        );

        return {
          ...dye,
          excitationDifference,
          emissionDifference,
          totalDifference:
            excitationDifference + emissionDifference,
        };
      })
      .sort((firstDye, secondDye) => {
        if (
          firstDye.totalDifference !== secondDye.totalDifference
        ) {
          return (
            firstDye.totalDifference -
            secondDye.totalDifference
          );
        }

        return (
          firstDye.excitationDifference -
          secondDye.excitationDifference
        );
      })
      .slice(0, 5);

    setErrorMessage("");
    setMatches(closestMatches);
    setHasSearched(true);
  };

  return (
    <section className="similar-dye-finder">
      <form
        className="similar-dye-form"
        onSubmit={handleSubmit}
      >
        <div className="wavelength-inputs">
          <label className="wavelength-field">
            <span>Excitation wavelength</span>

            <div className="wavelength-input-wrapper">
              <input
                type="number"
                min="1"
                step="any"
                inputMode="decimal"
                value={excitation}
                onChange={(event) =>
                  setExcitation(event.target.value)
                }
                placeholder="e.g. 488"
                aria-label="Excitation wavelength in nanometres"
              />

              <span>nm</span>
            </div>
          </label>

          <label className="wavelength-field">
            <span>Emission wavelength</span>

            <div className="wavelength-input-wrapper">
              <input
                type="number"
                min="1"
                step="any"
                inputMode="decimal"
                value={emission}
                onChange={(event) =>
                  setEmission(event.target.value)
                }
                placeholder="e.g. 519"
                aria-label="Emission wavelength in nanometres"
              />

              <span>nm</span>
            </div>
          </label>
        </div>

        <button
          className="find-similar-button"
          type="submit"
        >
          Find Similar Dyes
        </button>
      </form>

      {errorMessage ? (
        <p className="similar-dye-error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      {hasSearched && matches.length > 0 ? (
        <>
          <h3 className="similar-results-heading">
            Closest wavelength matches
          </h3>

          <div className="results similar-results">
            <table>
              <thead>
                <tr>
                  <th aria-label="Rank"></th>

                  <th>
                    Suggested
                    <br />
                    Dye
                  </th>

                  <th>
                    Compatible
                    <br />
                    Microscopes
                  </th>

                  <th>
                    Excitation
                    <br />
                    (nm)
                  </th>

                  <th>
                    Emission
                    <br />
                    (nm)
                  </th>

                  <th>
                    Excitation
                    <br />
                    Difference
                  </th>

                  <th>
                    Emission
                    <br />
                    Difference
                  </th>
                </tr>
              </thead>

              <tbody>
                {matches.map((dye, index) => (
                  <tr
                    key={`${dye.name}-${dye.excitation}-${dye.emission}`}
                  >
                    <td className="rank-cell">
                      <span className="match-rank">
                        {index + 1}
                      </span>
                    </td>

                    <td>{dye.name}</td>
                    <td>{dye.microscopes}</td>
                    <td>{dye.excitation}</td>
                    <td>{dye.emission}</td>
                    <td>
                      {dye.excitationDifference} nm
                    </td>
                    <td>
                      {dye.emissionDifference} nm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      <p className="similar-dye-note">
        Suggestions are based only on excitation and emission
        wavelength similarity. Confirm microscope settings and
        experimental suitability before using an alternative dye.
      </p>
    </section>
  );
}

export default SimilarDyeFinder;