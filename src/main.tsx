import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";
import { fetchUsers } from "./features/users/usersSlice.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PostLists from "./features/post/PostLists.tsx";
import { AddPostForm } from "./features/post/AddPostForm.tsx";
import SinglePostPage from "./features/post/SinglePostPage.tsx";
import Layout from "./components/Layout.tsx";

store.dispatch(fetchUsers());

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"index",
        element:<PostLists/>
      },
      {
        path: "/posts",
        element: <AddPostForm />,
      },
      {
        path: "/post/:postId",
        element: <SinglePostPage />,
      },
    ]
  },
 
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router} />
      <App />
    </Provider>
  </React.StrictMode>
);
