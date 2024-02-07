import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', price: 0 });

  useEffect(() => {
    axios.get('http://localhost:3001/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const addBook = () => {
    axios.post('http://localhost:3001/api/books', newBook)
      .then(response => setBooks([...books, response.data]))
      .catch(error => console.error('Error adding book:', error));
  };

  const updateBook = (id, updatedBook) => {
    axios.put(`http://localhost:3001/api/books/${id}`, updatedBook)
      .then(response => setBooks(books.map(book => (book._id === id ? response.data : book))))
      .catch(error => console.error('Error updating book:', error));
  };

  const deleteBook = (id) => {
    axios.delete(`http://localhost:3001/api/books/${id}`)
      .then(() => setBooks(books.filter(book => book._id !== id)))
      .catch(error => console.error('Error deleting book:', error));
  };

  return (
    <div>
      <h1>Online Bookstore</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} by {book.author} - ${book.price}
            <button onClick={() => deleteBook(book._id)}>Delete</button>
            <button onClick={() => updateBook(book._id, { title: `${book.title} (Updated)` })}>Update</button>
          </li>
        ))}
      </ul>
      <h2>Add a New Book</h2>
      <input type="text" placeholder="Title" onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
      <input type="text" placeholder="Author" onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
      <input type="number" placeholder="Price" onChange={(e) => setNewBook({ ...newBook, price: e.target.value })} />
      <button onClick={addBook}>Add Book</button>
    </div>
  );
}
export default App;

