import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./List.css"
import {toast} from 'react-toastify'

const List = ({url}) => {
  const [list, setList] = useState([]);
  
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    
    if(response.data.sucess){
      setList(response.data.data);
    }
    else{
      toast.error("Error");
    }
    
  }

  const removeFood = async (foodId)=>{

    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    
    await fetchList ();

    if(response.data.sucess){
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message)
    }


  }
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='list add flex-col'>
      <p>All food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='curser'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List