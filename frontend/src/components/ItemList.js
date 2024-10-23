import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => { 
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        axios.get('/api/items')
            .then(res => setItems(res.data))
            .catch(err => console.error(err))
    }, []);

    const addItem = () => { 
        if (newItem) {
            axios.post('/api/items', { name: newItem })
                .then(res => setItems([...items, res.data]))
                .catch(err => console.error(err));
            setNewItem('');
        }
    };

    const deleteItem = (id) => { 
        axios.delete(`/api/items/${id}`)
            .then(() => setItems(items.filter(item => item._id !== id)))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>Item List</h1>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button onClick={addItem}>Add Item</button>

            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        {item.name}
                        <button onClick={() => deleteItem(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;