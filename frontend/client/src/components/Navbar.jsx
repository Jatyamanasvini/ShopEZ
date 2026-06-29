import {Link} from "react-router-dom";


function Navbar(){


return(

<nav>


<h2 className="logo">
SHOP<span>EZ</span>
</h2>


<div className="menu">


<Link to="/">
HOME
</Link>


<Link to="/shop">
SHOP
</Link>


<Link to="/jackets">
JACKETS
</Link>


<Link to="/bottoms">
BOTTOMS
</Link>


<Link to="/tops">
TOPS
</Link>


<Link to="/accessories">
ACCESSORIES
</Link>


</div>


<p>
LOGIN &nbsp; CART(0)
</p>


</nav>


)

}


export default Navbar;