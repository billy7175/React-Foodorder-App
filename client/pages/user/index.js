import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

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
