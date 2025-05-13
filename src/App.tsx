import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './compnents/layout/Layout'
import { lazy, Suspense } from 'react'
import { Loader } from './compnents/loader/Loader'
import { ProfilePage } from './pages/ProfilePage/Profile'

const LazyMainpage = lazy(() => import('./pages/MainPage/mainPage'))
const LazyMoviepage = lazy(() => import('./pages/MoviePage/moviePage'))
const LazyGenrePage = lazy(() => import('./pages/GenrePage/genrePage'))
const LazyMoviesByGener = lazy(() => import('./pages/moviesByGener/moviesByGener'))

function App() {


  
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
                <Route index  element={<LazyMainpage />} />
                <Route path="/movie/:id" element={< LazyMoviepage/>} />
                <Route path="/movie/genres" element={< LazyGenrePage/>} />
                <Route path="/movie" element={< LazyMoviesByGener/>} />
                <Route path="/profile" element={<ProfilePage/>} />
            </Route>  
          </Routes>
      </Suspense>
		</BrowserRouter>
  )
}

export default App
