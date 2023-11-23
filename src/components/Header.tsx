
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header>
        <h1>Redux Blog</h1>
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/posts">Posts</NavLink></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header