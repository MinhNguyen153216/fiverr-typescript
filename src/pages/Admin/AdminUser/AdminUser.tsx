import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/configStore'
import { nguoiDungModel } from '../../../redux/models/nguoiDungModel'
import { getUserApi } from '../../../redux/reducers/nguoiDungReducer'

type Props = {}

export default function AdminUser({}: Props) {
  const {arrUser} = useSelector((state:RootState)=>state.nguoiDungReducer)
  const dispatch:AppDispatch = useDispatch()

  useEffect(()=>{
    const actionApi = getUserApi()
    dispatch(actionApi)
  },[])

  console.log(arrUser);

  const renderUser=()=>{
    return  arrUser.map((user:nguoiDungModel,index:number)=>{
      return (
        <tr>
        <td>{user.id}</td>
         <td>{user.name}</td>
         <td>{user.role}</td>
         <td>{user.skill}</td>
         <td>{user.certification}</td>
         <td className='text-center px-5'>
         <button className='btn btn-success me-2'>Xem thông tin</button>
         <button className='btn btn-primary me-2'>Sửa</button>
         <button className='btn btn-danger'>Xóa</button>
         </td>
        </tr>
      )
    
    })
   
  }
  return (
    <div className='adminuser'>
      <h1>Thêm quản trị viên</h1>
      <div className="search">
        <input type="text" id="search" placeholder='Nhập vào id hoặc tên người dùng' />
        <button>Tìm</button>
      </div>
      <table className='table table-striped'>
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Role</th>
          <th>Skills</th>
          <th>Certification</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          {renderUser()}
        
        </tbody>
      </table>
    </div>
  )
}