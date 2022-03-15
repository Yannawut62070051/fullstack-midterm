import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import HomePage from "./components/homePage";
import Homepage from "./pages/homepage"
import NavigationBar from "./components/navbar"
import PostPage from './pages/postpage';
import Author from './pages/authorpage';

const app = () => {
    return(
        <BrowserRouter>
            <div id="root">
                <NavigationBar />
                <Routes>
                    <Route path="/home" element={<Homepage />}/>
                    <Route path='/post' element={<PostPage/>}/>
                    <Route path='/authors' element={<Author/>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default app