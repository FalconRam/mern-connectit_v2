import { useHistory } from "react-router-dom";
import "./notFound.css";
const NotFound = () => {
  const history = useHistory();
  return (
    <div className="d-flex flex-column align-items-center mt-5 pt-5">
      <h1 className="not-found-heading">404</h1>
      <p className="fs-2 text-muted mb-2">Oops! Page not found</p>
      <p className="fs-6 text-muted text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <button
        type="button"
        class="btn btn-primary btn-sm"
        onClick={() => history.push("/")}
      >
        Go back to Home
      </button>
    </div>
  );
};

export default NotFound;
