import { useEffect, useState } from "react";
import CatList from "../../components/CatList";
import Link from "next/link";

export default function CatsPage() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [modalOpen, setModalOpen] = useState(false);
  const [catToDelete, setCatToDelete] = useState(null);

  const fetchCats = async () => {
    try {
      const res = await fetch("http://localhost:8000/cats/");
      if (!res.ok) throw new Error("Failed to fetch cats");
      const data = await res.json();
      setCats(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  
  const handleDeleteClick = (id) => {
    setCatToDelete(id);
    setModalOpen(true);
  };


  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/cats/${catToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete cat");
      setCats(cats.filter((cat) => cat.id !== catToDelete));
    } catch (err) {
      alert(err.message); 
    } finally {
      setModalOpen(false);
      setCatToDelete(null);
    }
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setCatToDelete(null);
  };

  const handleSalaryUpdate = async (id, newSalary) => {
    try {
      const res = await fetch(`http://localhost:8000/cats/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salary: parseFloat(newSalary) }),
      });
      if (!res.ok) throw new Error("Failed to update salary");
      const updatedCat = await res.json();
      setCats(cats.map((cat) => (cat.id === id ? updatedCat : cat)));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error)
    return <div className="container mt-5 text-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>Spy Cats Management</h2>
      <Link href="/cats/new" className="btn btn-success mb-3">
        Add New Spy Cat
      </Link>
      <CatList
        cats={cats}
        onDelete={handleDeleteClick} 
        onSalaryUpdate={handleSalaryUpdate}
      />

      {}
      {modalOpen && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-content p-4 bg-white rounded"
            style={{ width: "300px", boxShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
          >
            <h5>Confirm Deletion</h5>
            <p>Are you sure you want to delete this spy cat?</p>
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={cancelDelete}
                type="button"
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={confirmDelete}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
