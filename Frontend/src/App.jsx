import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    title: '',
    profilephoto: ''
  });

  useEffect(() => {
    fetchData();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function fetchData() {
    setIsLoading(true);
    fetch("https://questlab-cu0s.onrender.com/api/users/getdata")
      .then((res) => res.json())
      .then((finalData) => {
        setData(finalData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users", err);
        setIsLoading(false);
      });
  }

  function btnHandler() {
    setToggle(!toggle);
    document.body.style.overflow = toggle ? 'auto' : 'hidden';
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
    
    // Disable the submit button while processing
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Adding...';

    fetch("https://questlab-cu0s.onrender.com/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(newUser => {
        console.log("User added:", newUser);
        setData(prev => [...prev, newUser]);
        setFormData({ firstname: '', lastname: '', title: '', profilephoto: '' });
        setToggle(false);
        document.body.style.overflow = 'auto';
      })
      .catch(err => {
        console.error("Error adding user:", err);
        alert('Failed to add user. Please try again.');
      })
      .finally(() => {
        // Re-enable the submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Add Resident';
      });
  }

  return (
    <div className="app-container">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <h1>User Directory</h1>
          <button className="btn btn-black" onClick={btnHandler}>
            Add New Resident
          </button>
        </div>
      </nav>

      <div className={`modal-overlay ${toggle ? 'active' : ''}`} onClick={btnHandler}>
        <div className={`card modal ${toggle ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
          <button className="btn" onClick={btnHandler} aria-label="Close modal">
            &times;
          </button>
          <h2 className="mb-4">Add New Resident</h2>
          <form onSubmit={submitHandler} className="form" autoComplete="off">
            <div className="mb-3">
              <input 
                type="text" 
                id="firstname"
                name="firstname" 
                value={formData.firstname} 
                onChange={inputHandler} 
                placeholder="First Name"
                required 
                minLength={2}
                maxLength={50}
              />
            </div>
            
            <div className="mb-3">
              <input 
                type="text" 
                id="lastname"
                name="lastname" 
                value={formData.lastname} 
                onChange={inputHandler} 
                placeholder="Last Name"
                required 
                minLength={2}
                maxLength={50}
              />
            </div>
            
            <div className="mb-3">
              <input 
                type="text" 
                id="title"
                name="title" 
                value={formData.title} 
                onChange={inputHandler} 
                placeholder="Title"
                required 
                minLength={2}
                maxLength={100}
              />
            </div>
            
            <div className="mb-4">
              <input 
                type="url" 
                id="profilephoto"
                name="profilephoto" 
                value={formData.profilephoto} 
                onChange={inputHandler} 
                placeholder="Profile Photo URL"
                required 
                pattern="https?://.+"
                title="Please enter a valid URL starting with http:// or https://"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!formData.firstname || !formData.lastname || !formData.title || !formData.profilephoto}
            >
              Add Resident
            </button>
          </form>
        </div>
      </div>

      <main className="container">
        <div className="hero">
          <h1 className="hero-title">User Directory</h1>
          <p className="hero-subtitle">Your complete resident database</p>
        </div>
        
        {isLoading ? (
          <div className="text-center mt-5">
            <div className="loader"></div>
            <p className="mt-3">Loading residents...</p>
          </div>
        ) : (
          <div className="grid grid-3 mt-5">
            {data.map((ele, index) => (
              <div key={index} className="card">
                <div className="text-center mb-3">
                  <img 
                    src={ele.profilephoto} 
                    alt={`${ele.firstname} ${ele.lastname}`} 
                    className="profile-img-large"
                  />
                </div>
                <div className="text-center">
                  <h3 className="mb-2">{ele.firstname} {ele.lastname}</h3>
                  <p className="text-secondary">{ele.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About</h3>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">About Us</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;