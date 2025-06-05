import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    title: '',
    profilephoto: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch("https://questlab-cu0s.onrender.com/api/users/getdata")
      .then((res) => res.json())
      .then((finalData) => setData(finalData))
      .catch((err) => console.error("Failed to fetch users", err));
  }

  function btnHandler() {
    setToggle(!toggle);
  }

  function inputHandler(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function submitHandler(e) {
    e.preventDefault();

    fetch("https://questlab-cu0s.onrender.com/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(newUser => {
        console.log("User added:", newUser);

      
        setData(prev => [...prev, newUser]);

        setFormData({ firstname: '', lastname: '', title: '', profilephoto: '' });
        setToggle(false);
      })
      .catch(err => console.error("Error adding user:", err));
  }

  return (
    <div className="container">
      <button className="open-btn" onClick={btnHandler}>Add Resident</button>

      {toggle && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={btnHandler}>X</button>
            <form onSubmit={submitHandler} className="form" autoComplete="off">
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={inputHandler}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={inputHandler}
                placeholder="Last Name"
                required
              />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={inputHandler}
                placeholder="Title"
                required
              />
              <input
                type="text"
                name="profilephoto"
                value={formData.profilephoto}
                onChange={inputHandler}
                placeholder="Profile Photo URL"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      <h1 className="heading">User Directory</h1>
      <div className="card-container">
        {data.map((ele, index) => (
          <div key={index} className="card">
            <img src={ele.profilephoto} alt="Profile" className="profile-img" />
            <h2>{ele.firstname} {ele.lastname}</h2>
            <p className="title">{ele.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
