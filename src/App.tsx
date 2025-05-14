import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './compnents/layout/Layout'
import { lazy, Suspense, useEffect } from 'react'
import { Loader } from './compnents/loader/Loader'
import { useAppDispatch, useAppSelector } from './hooks/Redux'
import { getFavorites } from './features/favorite/FavoriteSlice'
import { fetchUserProfile } from './features/auth/authSlice'


const LazyMainpage = lazy(() => import('./pages/MainPage/mainPage'))
const LazyMoviepage = lazy(() => import('./pages/MoviePage/moviePage'))
const LazyGenrePage = lazy(() => import('./pages/GenrePage/genrePage'))
const LazyMoviesByGener = lazy(() => import('./pages/moviesByGener/moviesByGener'))
const LazyProfilePage = lazy(() => import('./pages/ProfilePage/Profile'))



function App() {
  const dispatch = useAppDispatch();
  const { user  } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);


useEffect(() => {
  if (user) {
    dispatch(getFavorites());
    
  }
}, [dispatch, user]);

  
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index  element={<LazyMainpage/>} />
                <Route path="/movie/:id" element={< LazyMoviepage/>} />
                <Route path="/movie/genres" element={< LazyGenrePage/>} />
                <Route path="/movie" element={< LazyMoviesByGener/>} />
                <Route path="/profile" element={<LazyProfilePage/>} />
            </Route>  
          </Routes>
      </Suspense>
		</BrowserRouter>
  )
}

export default App
