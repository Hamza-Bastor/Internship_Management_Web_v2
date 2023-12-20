import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Home from "../Home";

function Convention() {
  const [conventions, setConventions] = useState([]);

  const handleTraitementUpdate = (id, nouveauTraitement) => {
    setConventions((prevConventions) =>
      prevConventions.map((convention) =>
        convention.id === id
          ? { ...convention, traitement: nouveauTraitement }
          : convention
      )
    );
  };

  const conventionsCollectionRef = collection(db, "Convention");
  useEffect(() => {
    const getConventions = async () => {
      const data = await getDocs(conventionsCollectionRef);
      setConventions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getConventions();
  });

  return (
    <div>
      <Home />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1 style={{ textAlign: "center" }}>Demande de Conventions</h1>
      <table className="Convention table table-hover">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prenom</th>
            <th scope="col">Entreprise</th>
            <th scope="col">Adresse de l'entreprise</th>
            <th scope="col">Date Debut</th>
            <th scope="col">Date Fin</th>
            <th scope="col">Generer la convention</th>
          </tr>
        </thead>
        <tbody>
          {conventions.map((convention) => {
            return (
              <tr key={convention.id}>
                <td>{convention.nom}</td>
                <td>{convention.prenom}</td>
                <td>{convention.entreprise}</td>
                <td>{convention.adresse}</td>
                <td>{convention.date_debut}</td>
                <td>{convention.date_fin}</td>
                <td>
                  {convention.traitement}
                  <button
                    className="btn btn-success p-1 space-button"
                    onClick={() => handleTraitementUpdate(convention.id, "Acceptée")}
                  >
                    Accepter
                  </button>
                  <button
                    className="btn btn-danger p-1"
                    onClick={() => handleTraitementUpdate(convention.id, "Refusée")}
                  >
                    Refuser
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Convention;
