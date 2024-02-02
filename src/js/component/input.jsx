import React, { useEffect, useState } from "react";

const ToDoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([]);
    const validateInput = () => {
        if (inputValue === "") alert("The input cannot be empty");
        else (setList(list.concat([inputValue])))
    }
    const validate = (value) => {
        if (value === ' ') alert("That is an invalid character")
        else (setInputValue(value))
    }

    // const handleOnChange = () => {
        
    //     }
    // }
   
   
    const getTasks = () => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/Rociosantos18', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }
        ).then(response => {
            if (!response.ok) {
                throw new Error('User does not exist');
            }
            return response.json();
        })
        .then(response => setList(response))
        .catch(error => {
            console.error('Error:', error);
            setList([]);
        });
    };

    useEffect(() => {
        getTasks();
    }, []);
    
    const updateList = (value) => {
        const newTask = {
            label: value,
            done: false
        }
        const updateTasks = [...list, newTask]
        fetch('https://playground.4geeks.com/apis/fake/todos/user/Rociosantos18', {
            method: 'PUT',
            body: JSON.stringify(updateTasks),
            headers: {
                'Content-type': 'application/json'
            }
            
        }
        
        ).then((response) => {
            if (response.ok) {
                setInputValue("");
                return getTasks()
            }else{ 
                throw new Error ("Error")
            }
        }).catch ((error) => {console.error ("Error", error)})
    }

    const handleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            updateList(inputValue)
        };
    };
    const handleDeleteItem = (deleteOne) => {
        const newTask = list.filter((element) =>element.id !== deleteOne.id);
        setList(newTask);
        return  fetch('https://playground.4geeks.com/apis/fake/todos/user/Rociosantos18', {
            method: 'PUT',
            body: JSON.stringify(newTask),
            headers: {
                'Content-type': 'application/json'
            }
        }
    )};
    const deleteAll = () => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/Rociosantos18', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
            
        }
        
            ).then((response) =>  {if (response.ok){setList([])}})
    };
    

    return (
        <div className="body">
            <h1 className="text-center mt-5"> To do list</h1>
            <ul className="list-group list-group-flush">
                <li>
                    <input type="text" onChange={e => validate(e.target.value)} value={inputValue} placeholder="What needs to be done?"
                    onKeyDown={handleOnKeyDown} />
                    </li>
                
                {list.map((element) => {return (
                    <li key={element.id} className="element list-group-item d-flex justify-content-between align-items-center">
                        {element.label}
                        <i className="close fa-regular fa-circle-xmark"
                           onClick={()=> handleDeleteItem(element)} 
                        ></i>
                    </li>)})

                }
                <li className="number list-group-item">{list.length === 0 ? "No tasks, add new task" : `${list.length} task${list.length === 1 ? '' : 's'}`} </li>
            </ul>
            <button type="button" onClick={deleteAll}>All task done!!</button>

        </div>
    );
};


export default ToDoList;