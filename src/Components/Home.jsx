import { useSelector, useDispatch } from "react-redux";
import { updateTasks } from "../GlobalRedux/task";
import illustration from "../Images/illustration.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import loader from "../Images/loader.gif";
import MainLayout from "./MainLayout";

// TOAST NOTIFICATION
const notify = () => toast("Task deleted");
const fetchTasks = () => {
  return axios.get(`https://65a28a8542ecd7d7f0a7cce0.mockapi.io/crud`);
};


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.user);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  useEffect(() => {
    refetch();
  }, []);

  // FUNCTION TO DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://65a28a8542ecd7d7f0a7cce0.mockapi.io/crud/${id}`
      );
      refetch();
      notify();
    } catch (error) {
      console.log(error.message);
    }
  };

  // FUNCTION TO UPDATE TASK
  const routeToUpdateTask = (task, description, date, id) => {
    const formattedDate = date;
    const parsedDate = new Date(formattedDate);
    const standardFormatt = parsedDate.toISOString().split("T")[0];
    navigate("/update");
    dispatch(
      updateTasks({
        task: task,
        description: description,
        date: standardFormatt,
        id: id,
      })
    );
  };

  if (isLoading) {
    return (
      <div className="w-1/4 mt-48 mx-auto">
        <img src={loader} alt="loading spinner"></img>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="w-11/12 md:w-8/12 mx-auto mt-10">
        <Toaster />
        <p className="text-3xl md:text-5xl font-semibold py-2">Welcome {currentUser}</p>
        <p className="py-2">Click the button below to get started</p>
        <Link to="/create">
          <button className="bg-blue-700 hover:bg-blue-500 text-white p-3 w-full rounded-md">
            Add new Task
          </button>
        </Link>
        <section>
          {data?.data?.length === 0 ? (
            <img
              src={illustration}
              alt="illustration"
              className="w-full md:w-8/12 mx-auto"
            ></img>
          ) : (
            data?.data?.map((tasks) => (
              <div
                key={tasks.id}
                className="bg-blue-100 my-5 py-3 px-3 rounded flex flex-col"
              >
                <p className="py-2">
                  <span className="font-semibold">Task:</span> {tasks.task}
                </p>
                <p className="py-2 max-w-4xl">
                  <span className="font-semibold">Description:</span>{" "}
                  {tasks.description}
                </p>
                <p className="py-2">
                  <span className="font-semibold">Due Date:</span> {tasks.date}
                </p>
                <div className="flex gap-3">
                  <button
                    className="bg-blue-700 hover:bg-blue-500 text-white p-3 rounded-md"
                    onClick={() =>
                      routeToUpdateTask(
                        tasks.task,
                        tasks.description,
                        tasks.date,
                        tasks.id
                      )
                    }
                  >
                    Update
                  </button>

                  <button
                    className="bg-red-600 text-white p-3 rounded-md hover:bg-red-500"
                    onClick={() => deleteTask(tasks.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;
