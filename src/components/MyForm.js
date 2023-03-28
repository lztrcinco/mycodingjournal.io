import React, { useState, useEffect } from 'react';
import '../App.css';

const localData = localStorage.getItem('thoughts') ? JSON.parse(localStorage.getItem('thoughts')) : [];

function MyForm() {
    const [inputText, setInputText] = useState('');
    const [allData, setData] = useState(localData);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const currentDate = new Date(Date.now()).toLocaleDateString();

    useEffect(() => {
        localStorage.setItem('thoughts', JSON.stringify(allData));
    }, [allData]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editing) {
            const updatedData = allData.map((item) => {
                if (item.ID === editId) {
                    return { ...item, inputText };
                }
                return item;
            });
            setData(updatedData);
            setEditing(false);
            setEditId(null);
            setInputText('');
        } else {
            const ID = `${Date.now()}`;
            const data = {
                ID,
                date: currentDate,
                inputText,
            };
            setData([...allData, data]);
            setInputText('');
        }
    };

    const handleEdit = (id) => {
        const itemToEdit = allData.find((item) => item.ID === id);
        setEditing(true);
        setEditId(id);
        setInputText(itemToEdit.inputText);
    };

    const handleDelete = (id) => {
        const updatedData = allData.filter((item) => item.ID !== id);
        setData(updatedData);
    };

    return (
        <div className='main'>
            <form onSubmit={handleSubmit}>
                <fieldset className='header'>
                    <div>
                        <label>Date: </label>
                        <span>{currentDate}</span>
                    </div>
                    <label htmlFor='thoughts'>Thoughts for the Day</label>
                </fieldset>
                <textarea
                    rows='2'
                    cols='40'
                    id='thoughts'
                    value={inputText}
                    onChange={(event) => setInputText(event.target.value)}
                ></textarea>
                <button className='save'>{editing ? 'Update' : 'Save'}</button>
            </form>
            <Content
                data={allData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
}

function Content({ data, handleEdit, handleDelete }) {
    return (
        <div>
            <article>
                <h4 className='titleArticle'>Thoughts for the day</h4>
                {data.map((item) => (
                    <section key={item.ID}>
                        <div className='content'>
                            <p className="date">Date: <span>{item.date}</span></p>
                            <p className="text">{item.inputText}</p>
                        </div>
                        <div className='btn'>
                            <button className='edit' onClick={() => handleEdit(item.ID)}>
                                Edit
                            </button>
                            <button className='delete' onClick={() => handleDelete(item.ID)}>
                                Delete
                            </button>
                        </div>
                    </section>
                ))}
            </article>
        </div>
    );
}

export default MyForm;



// import React from 'react'
// import '../App.css'
// import Content from './Content';
// import { useState, useRef, useEffect } from 'react';
// const localData = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
// function MyForm() {
//     let inputText = useRef(null);
//     const currentDate = new Date(Date.now()).toLocaleDateString();

//     const [allData, setData] = useState(localData);
//     function HandleSubmit(event) {
//         // event.preventDefault();
//         const ID = `${Date.now()}`;
//         let data = {
//             ID: ID,
//             date: currentDate,
//             inputText: inputText.current.value,

//         }
//         setData([...allData, data]);
//         alert(JSON.stringify(allData));
//     }
//     useEffect(() => {
//         localStorage.setItem('items', JSON.stringify(allData));
//     }, [allData]);
//     return (
//         <div className='main'>
//             <form action='' onSubmit={HandleSubmit}>
//                 <fieldset className='header'>
//                     <div>
//                         <label>Date: </label>
//                         <span>{currentDate}</span>
//                     </div>
//                     <label for='thoughts'>Thoughts for the Day</label>
//                 </fieldset>
//                 <textarea rows='2' cols='40' id='thoughts' ref={inputText}></textarea>
//                 <button className='save'>Save</button>
//             </form>
//             <Content props={allData} />
//         </div>
//     )
// }

// export default MyForm