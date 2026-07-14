import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
// import { Provider } from "react-redux";
// import { store } from "./store/store";
import { AuthProvider } from "./context/auth.context";

function App() {
  return (
    // <Provider store={store}>  //
      <BrowserRouter>
        <AuthProvider>

          
         <AppRouter />
        </AuthProvider>
         
        
      </BrowserRouter>
    // </Provider>
  );
}

export default App;
