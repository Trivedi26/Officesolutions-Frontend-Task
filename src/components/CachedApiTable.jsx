import { useEffect, useState } from "react";

function CachedApiTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (forceRefresh = false) => {
    setLoading(true);

    if (!forceRefresh) {
      const cached = localStorage.getItem("cachedData");
      if (cached) {
        setData(JSON.parse(cached));
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10"
      );
      const result = await response.json();
      setData(result);
      localStorage.setItem("cachedData", JSON.stringify(result));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task 2 - Cached API Table</h1>
      <h2>Cached API Data</h2>

      <button
        onClick={() => fetchData(true)}
        style={{
          padding: "10px",
          marginBottom: "10px",
          color: "#fff",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Refresh Data
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CachedApiTable;
