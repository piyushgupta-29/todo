import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ListCom from "./ListCom";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const App = () => {

    const [item, setItem] = useState("");
    const [newItem, setNewItem] = useState([]);
    const [flag, setFlag] = useState(false);
    const [itemId, setItemId] = useState(null);
  
    const userHomePage = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(res);
            const result = await res.json();
            console.log(result);
            setNewItem(result);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        userHomePage();
    }, []);
    const itemEvent = (event) => {
        setItem(event.target.value);
    };
    const listOfItems =async () => {
        if(item&&!flag)
        {
            setNewItem([...newItem,{title: item}]);
            const x = item;
            setItem("");
            const res = await fetch("/insertdata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ x })
            });
            console.log(res);
        }
        else if(item&&flag)
        {
            setNewItem(
                newItem.map((val) => {
                    if( val._id === itemId )
                        return {...val, title: item};
                    return val;
                })
            )
            const x = item;
            setFlag(false);
            setItem('');
            const elemId = itemId;
            setItemId(null);
            const res = await fetch(`/updatedata`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ elemId, x })
            })
        }
        else 
        {
            alert('please fill data');
        }
    };
    const updateIt = async (id) => {
        const editItem = newItem.find((val) => {
            return val._id === id;
        });
        console.log(editItem);
        setFlag(true);
        setItem(editItem.title);
        setItemId(id);
    }
    const deleteIt = async (id) => {

        await fetch(`/deletedata`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            })
        setNewItem((oldItems) => {
            return oldItems.filter( (val) => {
                return val._id!==id;
            })
        })
    };
    return (
        <>
            <div className="main_div">
                <div className="center_div">
                    <br />
                    <h1> ToDo List </h1>
                    <br />
                    <input
                        type="text"
                        value={item}
                        name="title"
                        placeholder="Add an Items"
                        onChange={itemEvent}
                    />
                    <Button className="newBtn" onClick={listOfItems}>
                        { flag ? <EditIcon /> : <AddIcon />}
                    </Button>
                    <br />
                    <ol>
                        {newItem.map((val) => {
                            return <ListCom key={val._id} text={val.title} id={val._id} onDelete={deleteIt} onUpdate={updateIt}/>;
                        })}
                    </ol>
                    <br />
                </div>
            </div>
        </>
    );
};

export default App;