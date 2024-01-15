import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "./MainLayout";

// TOAST NOTIFICATION
const notify = () => toast("New Task added");
const LoginNotify = () => toast("You must create an account to add a task");

const CreateTask = () => {
  const loginState = useSelector((state) => state.user.isLoggedIn);
  const form = useForm({
    defaultValues: {
      task: "",
      description: "",
      date: new Date(),
    },
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = async (data) => {
    notify();
    reset();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = data.date.toLocaleDateString("en-US", options);
    try {
      if (loginState === false) {
        LoginNotify();
      } else {
        axios.post(`https://65a28a8542ecd7d7f0a7cce0.mockapi.io/crud`, {
          task: data.task,
          description: data.description,
          date: formattedDate,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <MainLayout>
      <section>
        <Toaster />
        <h1 className="text-3xl md:text-5xl text-center py-10 font-bold">
          Create your task here
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white w-full md:w-4/12 mx-auto">
            <div className="p-5">
              <input
                type="text"
                placeholder="What do you want to do?"
                className="border border-blue-500 p-2 w-full focus:outline-none focus:ring-2 "
                {...register("task", {
                  required: "Fill in a task",
                })}
              ></input>
              <p className="text-red-400 text-sm ">{errors.task?.message}</p>
            </div>
            <div className="p-5">
              <textarea
                rows={5}
                cols={100}
                type="text"
                placeholder="Task description"
                className="border border-blue-500 p-2 w-full focus:outline-none focus:ring-2 "
                {...register("description", {
                  required: "Describe your task please",
                })}
              ></textarea>
              <p className="text-red-400 text-sm ">
                {errors.description?.message}
              </p>
            </div>
            <div className="p-5">
              <input
                type="date"
                placeholder="Date"
                className="border border-blue-500 p-2 w-full focus:outline-none focus:ring-2 "
                {...register("date", {
                  valueAsDate: true,
                  required: "Date is required",
                })}
              ></input>
              <p className="text-red-400 text-sm ">{errors.date?.message}</p>
            </div>
            <div className="p-5 mx-auto">
              <button className="bg-blue-700 text-white p-3 w-full rounded-md hover:bg-blue-500">
                Add new task
              </button>
            </div>
          </div>
        </form>
      </section>
      <Link to="/home">
        <button className="bg-green-700 text-white p-3">Home</button>
      </Link>
    </MainLayout>
  );
};

export default CreateTask;
