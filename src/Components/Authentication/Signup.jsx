import { useForm } from "react-hook-form";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addNewUser } from "../../GlobalRedux/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
const notify = () => toast("This user already exists");
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accountState, setAccountState] = useState("Create an Account");
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  //   FUNCTION TO SUBMIT FORM DATA
  const onSubmit = async (data) => {
    dispatch(addNewUser(data.username));
    setAccountState("Please wait...");
    reset();
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("/home");
    } catch (error) {
      notify();
      setAccountState("Create an Account");
    }
  };

  return (
    <section className="bg-blue-400 h-screen w-screen pt-10 bg-opacity-40">
      <Toaster />
      <h1 className="text-5xl text-center py-10 font-bold">
        Manage tasks with Tasky
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white w-4/12 mx-auto">
          <div className="p-5">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 w-full focus:outline-none focus:ring-2 "
              {...register("username", {
                required: "Name is required",
              })}
            ></input>
            <p className="text-red-400 text-sm ">{errors.username?.message}</p>
          </div>
          <div className="p-5">
            <input
              type="text"
              placeholder="Email"
              className="border p-2 w-full  focus:outline-none focus:ring-2 "
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "invalid email",
                },
              })}
            ></input>
            <p className="text-red-400 text-sm ">{errors.email?.message}</p>
          </div>
          <div className="p-5">
            <input
              type="password"
              placeholder="Password"
              className="border p-2 w-full focus:outline-none focus:ring-2 "
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password should be atleast 8 characters",
                },
              })}
            ></input>
            <p className="text-red-400 text-sm ">{errors.password?.message}</p>
          </div>
          <div className="p-5 mx-auto">
            <button className="bg-blue-700 text-white p-3 w-full rounded-md">
              {accountState}
            </button>
            <Link to="/" className="text-blue-600 py-5 italic">
              Already have an account,sign in{" "}
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Signup;
