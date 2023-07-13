import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState("");
  const [dataobj, setDataObj] = useState([]);
  const [clearClass , setClearClass] = useState(null);

  const handleSearch = () => {
    let localData = localStorage.getItem("ToDo_data") || '[]';
    let parsedData = JSON.parse(localData);


    if (search.trim() !== "") {
      parsedData.push(search);
      localStorage.setItem("ToDo_data", JSON.stringify(parsedData));
    }

    setDataObj(parsedData); 

    setSearch("");
  };

  const addData = () => {
    let localData = localStorage.getItem("ToDo_data") || '[]';
    const parsedData = JSON.parse(localData);

    if (parsedData.length > 0) {
      console.log('true')
      setClearClass(true);
    } else {
      setClearClass(false);
    }

    setDataObj(parsedData);
  };

  const deleteTask = (index) => {
    let localData = localStorage.getItem("ToDo_data");
    const parsedData = JSON.parse(localData);
    parsedData.splice(index, 1);

    localStorage.setItem("ToDo_data", JSON.stringify(parsedData));
    addData();
  };

  const handleClearAll = () => {
    localStorage.removeItem("ToDo_data");
    setDataObj([])
    addData();
  };
  useEffect(() => {
    addData(); 
  }, []);

  return (
    <>
      <div className="app-container">
        <header>ToDo App</header>
        <section className="main-body">
          <div className="input-section">
            <input type="text" name="inp" id="inp" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={handleSearch} className={search !== "" ? "active" : ""}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="task-section">
            <ul>
              {dataobj.map((element, index) => (
                <li key={index}>
                  <div>{element}</div>
                  <button onClick={() => deleteTask(index)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <footer className="main-footer">
          <div className="footer-text">{`You have ${dataobj.length} panding Task`}</div>
          <button className={clearClass ? "active" : ""} onClick={handleClearAll}>Clear All</button>
        </footer>
      </div>
    </>
  );
}

export default App;