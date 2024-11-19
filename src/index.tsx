import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { UpdatePassword } from './pages/update-password';
import { ErrorPage } from './pages/error-page';
import reportWebVitals from './reportWebVitals';

const routes = [
  {
    path: '/',
    element: <div>首页</div>,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'update-password',
    element: <UpdatePassword />,
  }
]

const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
