function ProductCard(props){


return(


<div className="card">


<img src={props.image}/>


<h3>
{props.name}
</h3>


</div>


)

}


export default ProductCard;