import React, { useState } from "react";



//create your first component
const Input = () => {
    const [inputValue, setInputValue] = useState('');
    const validateInput = () => {
        if(inputValue === "") alert("The input cannot be empty");
        else(setList(list.concat([inputValue])))
        }
    const validate = (value) => {
        if(value === ' ') alert("That is an invalid character")
        else(setInputValue(value))
        }    

    const [list, setList] = useState([]);
    return (
        <div className="body">
            <h1 className="text-center mt-5"> To do list</h1>
            <ul className="list-group list-group-flush">
                <li>
                    <input type="text" onChange={e => validate(e.target.value)} value={inputValue} placeholder="What needs to be done?"
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                validateInput()
                                setInputValue("")
                            };
                        }} />
                </li>
                {list.map((element,index) => (
                    <li className="element list-group-item d-flex justify-content-between align-items-center">
                       {element}
                       <i className="close fa-regular fa-circle-xmark" 
                       onClick={()=> 
                        setList(list.filter((t,currentIndex) =>index != currentIndex))}></i>
                    </li>))
                
                }
                <li className="number list-group-item">{list.length} item left</li>
            </ul>
            
        </div>
    );
};


export default Input;