import React from 'react'
import {useState ,useEffect} from 'react';
import axios from 'axios';

function App() {

  const [users,setUsers]=useState([])
  useEffect(()=>{
      fetchDataFromBackend();
  },[])

  const fetchDataFromBackend=async()=>{
      axios.get('http://localhost:3000/user/getUser')
      .then(res=>{
      console.log(res);
      setUsers(res.data);
      })
      .catch(err=>console.log(err))
  }
  // console.log(users)
  // console.log("Hello");
  const userdata=users.userData;
  // console.log(typeof(userdata));


  const[formData,setFormData]=useState({
      username:'',
      userid:'',
      batch:'',
      hostelname:'',
      email:'',
    });
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        const response =await fetch('http://localhost:3000/user/addUser',{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
          },
          body:JSON.stringify(formData)
        });
        if(response.ok){
          console.log('Data saved successfully');
        }
        else{
          console.error('Failed to save data');
        }
      }
      catch(error){
        console.error('Error:',error);
      }
      setFormData({
        username:'',
        userid:'',
        batch:'',
        hostelname:'',
        email:'',
      })
  };

  const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleDelete = async(id)=>{
      try{
          const response = await fetch(`http://localhost:3000/user/deleteUser/${id}`,{
              method:'DELETE',
          });
          if(response.ok){
              console.log('data deleted successfully');
              fetchDataFromBackend();
          }else{
              console.error('failed to delete');
          }
      }catch(error){
          console.error('Error:',error);
      }
  }

  return (
    <>
      <form className='d-flex flex-column w-50% align-items-flex-start justify-content-center' onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name='username' value={formData.name} aria-describedby="emailHelp" placeholder="Enter Your Name" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Roll nunber</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name='userid' value={formData.userid} aria-describedby="emailHelp" placeholder="Enter Roll Nunber" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Hostel</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name='hostel' value={formData.hostelname} aria-describedby="emailHelp" placeholder="Enter Hostel(eg. alpha dashir block)" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Batch</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name='batch' value={formData.batch} aria-describedby="emailHelp" placeholder="Enter your batch" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Email ID</label>
          <input type="email" className="form-control" id="exampleInputPassword1" name='email' value={formData.email} placeholder="Enter your email id" onChange={handleChange}/>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        </div>
        <button type="submit" className="btn btn-primary w-25 margin">Submit</button>
      </form>
      <div className="container ">
        <div className="row">
          <div className="col">
            Name
          </div>
          <div className="col">
            Roll Number
          </div>
          <div className="col">
            Hostel
          </div>
          <div className="col">
            Batch
          </div>
          <div className="col">
            Email ID
          </div>
          <div className="col">
            Delete
          </div>
        </div>
          {
            userdata?.map((user)=>{
              return (
                <div className="row" key={user._id}>
                  <div className="col">
                    {user.username}
                  </div>
                  <div className="col">
                    {user.userid}
                  </div>
                  <div className="col">
                    {user.hostelname}
                  </div>
                  <div className="col">
                    {user.batch}
                  </div>
                  <div className="col">
                    {user.email}
                  </div>
                  <button type='button' className='btn btn-danger' onClick={()=>handleDelete(user._id)}>Delete</button>
                </div>
              )
            })
          }
      </div>
    </>
  );
}

export default App;
