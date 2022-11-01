import React, { useRef,useState,useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { number } from 'yup/lib/locale';
import { AppDispatch, RootState } from '../../../redux/configStore';
import { CongViec} from '../../../redux/models/congViecModel';
import { getTaskApi } from '../../../redux/reducers/congViecReducer';

type Props = {}

export default function AdminTask({}: Props) {
  const { arrTask } = useSelector((state: RootState) => state.congViecReducer);

  let keywordRef = useRef("");
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const [editable,setEditable]=useState(false)
  // console.log(arrTask);
  const [active,setActive]=useState(false)
  console.log(Number(keywordRef.current));
  
   const tasksPerPage = 5;
    const pageCount = Math.ceil(arrTask.length / tasksPerPage);
    const changePage = ({ selected }: any) => {
      setPageNumber(selected);
    };
  


  const pagesVisited = pageNumber * tasksPerPage;
  let displayTasks = arrTask
    .slice(pagesVisited, pagesVisited + tasksPerPage)
    .map((task: CongViec, index: number) => {
      return (
        <tr key={task.id}>
          <td>{task.id}</td>
          <td>{task.tenCongViec}</td>
          <td><img src={task.hinhAnh} alt="..." style={{width:'60px',height:'60px'}} /></td>
          <td className='text-center'>{task.giaTien}</td>
          <td>{task.moTaNgan}</td>
          <td className="text-center px-5">
            <button
              className="btn btn-primary "
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              // onClick={() => {
              //   setEditable(true)
              //   handleUpdate(user.id, user);
              // }}
            >
              Sửa
            </button>
            <button
              className="btn btn-danger"
              // onClick={() => {
              //   handleDelete(user.id, user);
              // }}
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });


   
    let keyword: any = searchParams.get("keyword");

  const handleChange = (e: any) => {
    keywordRef.current = e.target.value;
    setSearchParams({ keyword: keywordRef.current });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchParams({ keyword: keywordRef.current });
  };


  useEffect(() => {
    dispatch(getTaskApi(keyword));
  }, [keywordRef.current]);

  return (
    <div className="adminuser">
    <h1>
      <span data-bs-toggle="modal" data-bs-target="#exampleModal" 
      // onClick={()=>{
      //   setEditable(false)
      // }}
      >
        Thêm quản trị viên
      </span>
    </h1>
    <form className="search" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        id="search"
        placeholder="Nhập vào id công việc cần tìm"
      />
      <button type="submit">Tìm</button>
    </form>
    <table className="table table-striped" >
      <thead>
        <tr className='text-center'>
          <th>Id</th>
          <th>Name</th>
          <th>Img</th>
          <th>Price</th>
          <th>Descriptions</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{displayTasks}</tbody>
    </table>
    <ReactPaginate
      previousLabel={"Prev"}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName={"paginationBtn"}
      previousLinkClassName={"previousBtn"}
      nextLinkClassName={"nextBtn"}
      disabledClassName={"paginationDisabled"}
      activeClassName={"paginationActive"}
    />
    {/* <PopUpModal editable={editable} setEditable={setEditable}/> */}
  </div>
  )
}