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
        <div className='m-3 p-2 bg-slate-200 w-80'>
            <h1 className='text-2xl font-bold'>Item List</h1>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className='h-8'
            />
            <button onClick={addItem} className='bg-green-400 p-1 ml-2'>Add Item</button>

            <ul className='py-2 pr-10'>
                {items.map(item => (
                    <li key={item._id} className='border-2 border-b border-white-500'>
                        {item.name}
                        <button onClick={() => deleteItem(item._id)} className='bg-red-400 p-1 ml-2'>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;