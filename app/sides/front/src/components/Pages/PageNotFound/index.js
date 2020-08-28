import { useLocation } from 'react-router';

export const PageNotFound = () => {
  const location = useLocation();
  return (
    <div>
      <h4>
        Page <code>{location.pathname}</code> not found
      </h4>
    </div>
  );
};
