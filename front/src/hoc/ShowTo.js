import {useSelector} from "react-redux";

const ShowTo = ({children, role}) => {
  const currentUser = useSelector(state => state.users.user);

  if (currentUser && currentUser.role === role) {
    return children;
  }

  return null;
};

export default ShowTo;