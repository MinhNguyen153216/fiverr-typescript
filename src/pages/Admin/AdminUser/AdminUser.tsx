import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { number, string } from "yup/lib/locale";
import Pagination from "../../../components/Pagination/Pagination";
import PopUpModal from "../../../components/PopUpModal/PopUpModal";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { nguoiDungModel } from "../../../redux/models/nguoiDungModel";
import { deleteUserApi, getUserApi } from "../../../redux/reducers/nguoiDungReducer";
import { http } from "../../../util/setting";

type Props = {
 
};

export default function AdminUser({}: Props) {
  const { arrUser } = useSelector((state: RootState) => state.nguoiDungReducer);
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);
  const [arrUserSearch, setArrUserSearch] = useState(arrUser);
  let [searchParams, setSearchParams] = useSearchParams();
  let keywordRef = useRef("");
  let timeoutRef = useRef({});
  const params = useParams()
  

  const getUserByKeyWord = async () => {
    try {
      let keyword: any = searchParams.get("keyword");
      if (keyword !== "" && keyword !== null) {
        const result = await http.get("/users/search/" + keyword);
        console.log(result.data.content);
        setArrUserSearch(result.data.content);
        const timeResult:any= timeoutRef.current;
        clearTimeout(timeResult);
      } else {
        setArrUserSearch(arrUser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(arrUserSearch);

  useEffect(() => {
    //call api
    getUserByKeyWord();
  }, [keywordRef.current]);

  const handleChange = (e: any) => {
    keywordRef.current = e.target.value;
    timeoutRef.current = setTimeout(() => {
      setSearchParams({ keyword: keywordRef.current });
    }, 500);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // setSearchParams({ keyword: keywordRef.current });
  };

  const handleDelete=(id:number,user:any)=>{
    const actionThunk = deleteUserApi(id,user)
    console.log(id);

    
    dispatch(actionThunk)
  }

  useEffect(() => {
    const actionApi = getUserApi();
    dispatch(actionApi);
  }, []);

  // Get current users
  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = arrUserSearch.slice(indexOfFirstUser, indexOfLastUser);


  const renderUser = () => {
    return currentUsers.map((user: nguoiDungModel, index: number) => {
      // console.log(user.certification);
      
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.role}</td>
          <td>{user.skill}</td>
          <td>{user.certification}</td>
          {/* <td>{user.certification.length>4?user.certification.slice(4,10):user.certification}</td> */}
          <td className="text-center px-5">
            <button className="btn btn-success me-2">Xem thông tin</button>
            <button className="btn btn-primary me-2">Sửa</button>
            <button className="btn btn-danger" onClick={()=>{handleDelete(user.id,user)}
            }>Xóa</button>
          </td>
        </tr>
      );
    });
  };

  // Change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <div className="adminuser">
      <h1><span  data-bs-toggle="modal" data-bs-target="#exampleModal">Thêm quản trị viên</span></h1>
      <form className="search" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          id="search"
          placeholder="Nhập vào tên người dùng"
        />
        <button type="submit">Tìm</button>
      </form>
      <table className="table table-striped">
        <thead>
          <tr >
            <th>Id</th>
            <th>Name</th>
            <th>Role</th>
            <th>Skills</th>
            <th>Certification</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderUser()}</tbody>
      </table>
      <Pagination
        className="pagination"
        userPerPage={userPerPage}
        totalUsers={arrUserSearch.length}
        paginate={paginate}
      />
      <PopUpModal/>
    </div>
  );
}
