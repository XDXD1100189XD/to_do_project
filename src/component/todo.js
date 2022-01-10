import React, { useState, useEffect } from 'react'
import "./Todo.css"
const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}
const Todo = () => {
    
    const [input, setInput] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    const addItem = () => {
        if (!input) {
            alert('plzz fill data');
        }
        else if (input && !toggleSubmit)
    {
        setItems(
             items.map((elem) => {
                if (elem.id === isEditItem) {
                    return { ...elem, name: input }
                }
                return elem;
            })
        )
        setToggleSubmit(true);

        setInput('');

        setIsEditItem(null);
    }
        else
        {
            const allInputData = { id: new Date().getTime().toString(), name: input }
            setItems([...items, allInputData]);
            setInput('')

        }
    }
    
    const deleteItem = (ind) => {
        console.log('hi');
        const updatedItems=items.filter((ele) => {
            return ele.id !== ind;
        })
        setItems(updatedItems);
    }
    const editItem = (ind) => {
        console.log('hi');
        const updatedItems = items.find((ele) => {
            return ele.id === ind;
        })
        console.log(updatedItems)
        setToggleSubmit(false)
        setInput(updatedItems.name)
        setIsEditItem(updatedItems.id)
    }
    const removeAll = () => {
        console.log('hi');

        setItems([]);
    }
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (
        
            <>
                <div className="main-div">
                    <div className="child-div">
                        <figure>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/GNOME_Todo_icon_2019.svg/800px-GNOME_Todo_icon_2019.svg.png" alt="todologo" />
                            <figcaption>Add Your List Here ✌</figcaption>
                        </figure>

                        <div className="addItems">
                        <input type="text" placeholder="✍ Add Items..."
                            value={input} onChange={(e) => setInput(e.target.value) }
                        />
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :
                                <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                        }

                        </div>

                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })

                        }

                            

                        </div>

                        {/* clear all button  */}
                        <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> CHECK LIST </span> </button>
                        </div>
                    </div>
                </div>
            </>



        
    );
}

export default Todo;