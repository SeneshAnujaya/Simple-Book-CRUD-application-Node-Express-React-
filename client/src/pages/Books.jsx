import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get("http://localhost:5000/books")
                setBooks(res.data)
            } catch(err) {
                console.log(err);
            }
        }
        fetchAllBooks()
    },[])

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:5000/books/"+id)
            window.location.reload()
        }catch(err) {

        }
    }

    const importImage = (imageName) => {
        try {
            return require(`../images/${imageName}`);
        } catch(error) {
            console.error('Image not found', error);
            return null
        }
    }
    return (
        <div>
            <h1>Anujaya Book Hub</h1>
            <div className="books">
                {books.map((book) => (
                    <div className="book" key={book.id}>
                        {book.cover && <img src={importImage(book.cover)}  alt="book-cover" />}
                        <h2>{book.title}</h2>
                        <span>Rs {book.price}</span>
                        <p>{book.desc}</p>
                        
                        <button className="update"><Link to={`/update/${book.id} `}>Update</Link></button>
                        <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                   
                    </div>
                ))}
            </div>
            <button className="add-btn"><Link to="/add">Add new book</Link></button>

        </div>
        
    )
}

export default Books