import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import HomePage from "./components/homePage";
import TagCategory from "./pages/homepage"
// import Author from './components/author';
import FullContent from './pages/postpage'
// import AddComment from './components/addComment'
import NavigationBar from "./components/navbar"
import "./style/app.css"

const app = () => {
    return(
        <BrowserRouter>
            <div id="root">
                <NavigationBar />
                <Routes>
                    {/* <Route path="/" element={<HomePage />} exact/> */}
                    <Route path="/home" element={<TagCategory />}/>
                    {/* <Route path="/author" element={<Author />}/> */}
                    <Route path="/full-content" element={<FullContent />}/>
                    {/* <Route path="/addComment" element={<AddComment />}/> */}
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default app