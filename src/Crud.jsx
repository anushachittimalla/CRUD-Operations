import React, { useState, useEffect } from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
const Crud = () => {
   
    const [userData,setUserData] =useState([]);
    const [formData, setFormData] = useState({
        id: "",
        first_name: "",
        email: "",
    });
    const[showInputContainer, setShowInputContainer] = useState(false);
    const[updateUser, setUpdateUser] =useState({})
    const changeHandler = e => {
        setFormData((prevFormData) => ({ ...prevFormData,[e.target.name]: e.target.value}))
    }

    const loadUserdata = () => {
        axios.get(`http://localhost:3000/data`)
            .then(res => {
                setUserData(res.data)
                console.log(res,"requestedata")
            }).catch((err) => {
                console.log(err, "error")
            });
    }

    useEffect(loadUserdata, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/data`, formData)
            .then(res => {
                loadUserdata()
            }).catch((err) => {
                console.log(err, "error")
            });
            

    }
    const handleEdit = (k) => {
        setShowInputContainer(true);
        console.log(k,"k")
        axios.get(`http://localhost:3000/data?id=`+ k)
        .then(res => {
            console.log(res,"updatedata")
            const temp = res.data[0];
            console.log(temp,"temp")
            
          setFormData(temp);
          console.log(formData)
           
        }).catch((err) => {
            console.log(err, "error")
        });
    }
    const handleUpdate = (e) => {
        axios.put(`http://localhost:3000/data/`+formData.id, formData)
        .then(res => {
            console.log(res, "updateuser")
            
            
        }).catch((err) => {
            console.log(err, "error")
        });
    }
    const handleDelete = (k) => {
        axios.delete(`http://localhost:3000/data/`+k)
        .then(res => {
            console.log(res, "deleteuser")
           
            loadUserdata()
        }).catch((err) => {
            console.log(err, "error")
        });
    }
    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5">
                <h4> CRUD API Integration in React js using axios</h4>
                <form className='submit' onSubmit={(e) => handleSubmit(e)} >
                    <input type='text' placeholder='Id' className='' name='id' onChange={(e) => changeHandler(e)} />
                    <input type='text' placeholder='Name' className='' name="first_name" onChange={(e) => changeHandler(e)} />
                    <input type='text' placeholder='Email' className='' name='email' onChange={(e) => changeHandler(e)} />
                    <button className="btn btn-success" type='submit'> SUBMIT</button>
                </form>
              <table className="mt-5 table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Buttons</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((each, i) => 
                    <tr key={i}>
                        <td>{each.id}</td>
                        <td>{each.first_name}</td>
                        <td>{each.email}</td>
                        <td>
                            <button className="btn btn-primary me-2" onClick={() => handleEdit(each.id)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(each.id)}>Delete</button>

                        </td>
                    </tr>
                    
                    )}

                </tbody>
              </table>
            </div>
        {showInputContainer &&
        <div>
             <form className='submit' onSubmit={() => handleUpdate()} >
                    <input type='text' placeholder='Id' className='form-control' name='id' value={formData.id}/>
                    <input type='text' placeholder='Name' className='form-control' name="first_name" onChange={(e) => setFormData({...formData, first_name: e.target.value})}  value={formData.first_name}  />
                    <input type='text' placeholder='Email' className='form-control' name='email' onChange={(e) => setFormData({...formData, email: e.target.value})} value={formData.email}   />
                    <button className="btn btn-success" type='submit'> Update</button>
                </form>
        </div>
        }
    </div >
    )
}
export default Crud;