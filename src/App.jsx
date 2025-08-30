import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import ApiTable from "../src/components/ApiTable";
import CachedTable from "../src/components/CachedApiTable";
import SearchFilter from "../src/components/SearchFilter";
import FlowChart from "../src/components/FlowCanvas";

function App() {
  const [cachedData, setCachedData] = useState([]);

  useEffect(() => {
    const cached = localStorage.getItem("apiData");
    if (cached) {
      setCachedData(JSON.parse(cached));
    } else {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => {
          setCachedData(data);
          localStorage.setItem("apiData", JSON.stringify(data));
        })
        .catch((err) => console.error("Error fetching:", err));
    }
  }, []);

  const items = [
    { key: "1", label: "Task 1: API Table", children: <ApiTable /> },
    {
      key: "2",
      label: "Task 2: Caching",
      children: <CachedTable data={cachedData} />,
    },
    {
      key: "3",
      label: "Task 3: Search/Filter",
      children: <SearchFilter data={cachedData} />,
    },
    { key: "4", label: "Task 4: FlowChart", children: <FlowChart /> },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Assignment Tasks</h1>
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
}

export default App;
