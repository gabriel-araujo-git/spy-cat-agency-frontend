import { useState } from "react";
import { useRouter } from "next/router";

export default function NewCat() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    years_of_experience: "",
    breed: "",
    salary: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      name: form.name.trim(),
      years_of_experience: Number(form.years_of_experience),
      breed: form.breed.trim(),
      salary: Number(form.salary),
    };

    // Basic frontend validation
    if (
      !payload.name ||
      isNaN(payload.years_of_experience) ||
      !payload.breed ||
      isNaN(payload.salary)
    ) {
      setError("Please fill out all fields correctly.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/cats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to create cat");
      }
      router.push("/cats");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh", backgroundColor: "#f8f9fa", padding: "2rem" }}
    >
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "420px", width: "100%", borderRadius: "12px" }}
      >
        <h2 className="mb-3 text-center" style={{ fontWeight: "700", color: "#343a40" }}>
          Add New Spy Cat
        </h2>
        <p className="text-center text-muted mb-4">
          Fill out the form below to add a new spy cat to the agency.
        </p>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter the cat's name"
              value={form.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="years_of_experience" className="form-label fw-semibold">
              Years of Experience <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              id="years_of_experience"
              name="years_of_experience"
              className="form-control"
              placeholder="0"
              value={form.years_of_experience}
              onChange={handleChange}
              min="0"
              max="50"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="breed" className="form-label fw-semibold">
              Breed <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="breed"
              name="breed"
              className="form-control"
              placeholder="e.g., Siamese, Bengal"
              value={form.breed}
              onChange={handleChange}
              list="breeds"
              required
              disabled={loading}
              autoComplete="off"
            />
            <datalist id="breeds">
              {/* Substitua pelo seu array de raças importado */}
              <option value="Siamese" />
              <option value="Bengal" />
              <option value="Persian" />
              <option value="Maine Coon" />
              <option value="Ragdoll" />
              <option value="Bambino" />
              {/* ... */}
            </datalist>
          </div>

          <div className="mb-4">
            <label htmlFor="salary" className="form-label fw-semibold">
              Salary <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              className="form-control"
              placeholder="0.00"
              value={form.salary}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
            style={{ fontWeight: "600", fontSize: "1.1rem" }}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {loading ? "Saving..." : "Save Spy Cat"}
          </button>
        </form>
      </div>
    </div>
  );
}
