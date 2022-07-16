import { useState, useContext, useEffect } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from 'axios'

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [courses, setCourses] = useState([])

  useEffect(() => {
    loadCourses();
  },[])

  const loadCourses = async () => {
    const {data} = await axios.get('/api/user-courses')
    setCourses(data)

  }



  return (
    <UserRoute>
      <h1 className="jumbotron text-center square bg-primary">
        <h2>can you see me ?</h2>
        <pre>{JSON.stringify(user, null, 4)}</pre>
      </h1>
    </UserRoute>
  );
};

export default UserIndex;
