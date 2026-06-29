import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";


function Home(){


return(

<div>


<Hero/>


<div className="products">


<ProductCard
image="/jacket.jpg"
name="Black Jacket"
/>


<ProductCard
image="/hoodie.jpg"
name="Street Hoodie"
/>


<ProductCard
image="/jeans.jpg"
name="Destroyed Jeans"
/>


</div>


</div>

)

}


export default Home;