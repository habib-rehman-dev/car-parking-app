import Approuter from "./router/Approuter";

function App() {
  return (
    <div
      className="
        min-h-screen w-full text-white font-sans
        bg-[linear-gradient(to_bottom,rgba(17,24,39,0.75),rgba(17,24,39,0.85)),url('/bg-parking.jpg')]
        bg-cover bg-center bg-no-repeat 
        bg-fixed 
        overflow-y-auto overflow-x-hidden
      "
    >
      <Approuter/>
      
    </div>
  );
}

export default App;
