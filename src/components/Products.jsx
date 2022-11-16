import { useEffect, useState } from "react";
import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import axios from 'axios';
import toast from 'react-hot-toast'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const MainContainer = styled.div`
    padding: 20px;
`;

const Heading3 = styled.p`
  font-size: 36px;
  padding-bottom: 15px;
`

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get( cat ? `http://localhost:5000/api/v1/products?category=${cat}` : "http://localhost:5000/api/v1/products" )
        setProducts(data.products)
      } catch (err) {
        console.log(err)
      }
    }
    getProducts();
  }, [cat]);

    
  useEffect(() => {
    if(cat || filters || sort ) {
      setFilteredProducts(
        products.filter((item) => 
          Object.entries(filters).every(([key, value]) => 
            item[key].includes(value)
          )
        )
      )
    }
     
  }, [products, cat, filters, sort]);

  useEffect(() => {
    if ((sort === "newest")) {
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if ((sort === "asc")) {
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort])

  const renderProductsConditionally = () => {
    if (products || filteredProducts) {
      if (cat || filters || sort) {
        return (
          filteredProducts.map((item) => (
            <Product item={item} key={item._id} />
          )) 
        )
      } else {
        return (
          products.slice(0, 8).map((item) => (
            <Product item={item} key={item._id} />
          ))
        )
      }
    }
  }

  return (
    <MainContainer>
      <Heading3>Products</Heading3>
      <Container>
        { renderProductsConditionally() }
      </Container>
    </MainContainer>
  );
};

export default Products;
