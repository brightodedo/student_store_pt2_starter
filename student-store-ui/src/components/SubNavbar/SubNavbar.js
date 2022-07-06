import { useState } from "react"
import { Link } from "react-router-dom"
import person from "../../assets/person.svg"
import "./SubNavbar.css"
import ApiClient from '../../services/apiClient'

export default function SubNavbar({
  user,
  activeCategory,
  setActiveCategory,
  handleOnSearchInputChange,
  searchInputValue,
  setUser,
}) {
  const [open, setOpen] = useState(true)

  const toggleOpen = () => setOpen((isOpen) => setOpen(!isOpen))

  const handleOnClick = (event) => {
    event.preventDefault();
    
    ApiClient.logoutUser()
    setUser(null)
  }
  return (
    <nav className="SubNavbar">
      <div className="content">
        <div className="row">
          <div className="search-bar">
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={searchInputValue}
              onChange={handleOnSearchInputChange}
            />
            <i className="material-icons">search</i>
          </div>

          <div className="links">
            <span className="help">
              <i className="material-icons">help</i>
              Help
            </span>

            <div className="auth">
              {user?.email ? (
                <div>
                <Link to="/orders">
                  <img src={person} alt="avatar" />
                  {user.email}
                </Link>
                <div className="dog" onClick={handleOnClick}>
                  Logout
                  <i className="material-icons">send</i>
              </div>
              </div>
              ) : (
                <Link to="/login">
                  <img src={person} alt="avatar" />
                  Login
                </Link>
              )}
            </div>

            <div className="cart">
              <Link to="/shopping-cart">
                My Cart
                <i className="material-icons">shopping_cart</i>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="hamburger-menu">
            <i className="material-icons" onClick={() => toggleOpen()}>
              menu
            </i>
          </div>

          <ul className={`category-menu ${open ? `open` : `closed`}`}>
            {["All Categories", "Clothing", "Food", "Accessories", "Tech"].map((cat) => (
              <li className={activeCategory === cat ? "is-active" : ""} key={cat}>
                <button onClick={() => setActiveCategory(cat)}>{cat}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
