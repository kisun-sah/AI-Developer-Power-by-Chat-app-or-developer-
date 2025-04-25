import { UserProvider } from "./context/user.context"
import AppRoute from "./routes/AppRoute"



const App = () => {
  return (

    <UserProvider>
      <AppRoute/>
    </UserProvider>
    
  
  )
}

export default App