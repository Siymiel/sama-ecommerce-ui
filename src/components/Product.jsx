import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/cartFeature';
import toast from 'react-hot-toast';
import { popularProducts } from "../data";
import { useState, useEffect } from "react";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;


const Image = styled.img`
  height: 100%;
  width: 100%;
  z-index: 2;
  object-fit: cover;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;


const Product = ({ item }) => {
  const user = useSelector(state => state.user.currentUser);
  const [product, setProduct] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddToCart = (productId) => {
    const selectedProduct = popularProducts.find(product => product.id === productId);
    
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  };
  
  useEffect(() => {
    if (product !== null) {
      if (user) {
        dispatch(addProduct({ ...product, productQuantity }));
        toast.success("Product added to cart!");
      } else {
        navigate('/login');
        toast.error('Sign in to continue.');
      }
    }
  }, [product]);
  
  const addToCart = (productId) => {
    handleAddToCart(productId);
  };
  
  const handleAddToFavourite = () => {
    toast.success('Product added to favourites!')
  }

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined onClick={() => addToCart(item.id)} />
        </Icon>
        <Icon>
          <Link to={`/product/${item.id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined onClick={handleAddToFavourite} />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
