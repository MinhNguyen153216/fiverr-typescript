import React, { useRef, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { number } from "yup/lib/locale";
import PopUpModal from "../../../components/PopUpModal/PopUpModal";
import PopUpTask from "../../../components/PopUpModal/PopUpTask";
// import PopUpTask from "../../../components/PopUpModal/PopUpTask";
import { AppDispatch, RootState } from "../../../redux/configStore";
import { CongViec } from "../../../redux/models/congViecModel";
import {
  deleteTaskApi,
  getTaskApi,
  updateTaskAction,
  updateTaskAdminApi,
} from "../../../redux/reducers/congViecReducer";

type Props = {};

export default function AdminTask({}: Props) {
  const { arrTask } = useSelector((state: RootState) => state.congViecReducer);
  const { arrRow } = useSelector((state: RootState) => state.congViecReducer);
  const dispatch: AppDispatch = useDispatch();

  let keywordRef = useRef("");
  let [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [editable, setEditable] = useState(false);
  const [active, setActive] = useState(false);
  // console.log(arrRow);
  // console.log(Number(keywordRef.current));

  const tasksPerPage = 5;
  // const pageCount = Math.ceil(arrTask.length / tasksPerPage);
  const pageCount = Math.ceil(arrRow/ tasksPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected+1);
    // return selected
  };
  // console.log({selected})

  // const pagesVisited = pageNumber * tasksPerPage;
  let displayTasks = arrTask
    .map((task: CongViec, index: number) => {
      return (
        <tr key={task.id}>
          <td>{task.id}</td>
          <td>{task.tenCongViec}</td>
          <td>
            <img
              src={task.hinhAnh}
              alt="..."
              style={{ width: "60px", height: "60px" }}
            />
          </td>
          <td className="text-center">{task.giaTien}</td>
          <td>{task.moTaNgan}</td>
          <td className="text-center px-5" style={{verticalAlign:'middle',width:'150px'}}>
            <button
              className="btn btn-primary m-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalTask"
              onClick={() => {
                setEditable(true)
                handleUpdate(task.id, task);
              }}
            >
              Sửa
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete(task.id, task);
              }}
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });

    const handleUpdate = (id: any, task: any) => {
      const action =updateTaskAction(task)
      dispatch(action)
      console.log(task);
   
    };

  const handleDelete = (id: any, task: any) => {
    const actionThunk = deleteTaskApi(id, task);
    console.log(id);
    dispatch(actionThunk);
  };
  // console.log(displayTasks);

  let keyword: any = searchParams.get("keyword");
  // console.log(keyword);

  const handleChange = (e: any) => {
    keywordRef.current = e.target.value;
    setSearchParams({ keyword: keywordRef.current });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchParams({ keyword: keywordRef.current });
  };


  useEffect(() => {
    dispatch(getTaskApi(keyword,pageNumber));
  }, [keywordRef.current,pageNumber]);

  useEffect(() => {
    dispatch(getTaskApi('a',1));
  }, []);


  return (
    <div className="adminuser">
      <h1>
        <span
          data-bs-toggle="modal"
          data-bs-target="#exampleModalTask"
          onClick={() => {
            setEditable(false);
          }}
        >
          Thêm công việc
        </span>
      </h1>
      <form className="search" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          id="search"
          placeholder="Nhập vào tên công việc cần tìm"
        />
        <button type="submit">Tìm</button>
      </form>
      <table className="table table-striped">
        <thead>
          <tr className="text-center">
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
      <PopUpTask editable={editable} setEditable={setEditable} />


  
      
    </div>
  );
}
