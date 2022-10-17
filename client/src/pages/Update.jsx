import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
  const [book, setBook] = useState({
    title: '',
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update Book</h1>
      <input
        type="text"
        label="Book title"
        // value={book.title}
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        label="Book desc"
        // value={book.desc}
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        label="Book price"
        // value={book.price}
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        label="Book cover"
        // value={book.cover}
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/" className='homeButton'>See All Books</Link>
    </div>
  )
}

export default Update;