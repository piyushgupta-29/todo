import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ListCom = (props) => {

    return (
        <div className="todo_style">
            <li key={props.id}>
                {props.text}
            </li>
            <div className="del_up_btn">
            <span onClick={() => { props.onUpdate(props.id) }}>
                <EditIcon className="editIcon"/>
            </span>
            <span onClick={() => { props.onDelete(props.id) }}>
                <DeleteIcon className="deleteIcon"/>
            </span>
            </div>
        </div>
    );
};

export default ListCom;