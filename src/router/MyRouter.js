import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import QuizPage from '../pages/QuizPage'
import LiveMapPage from '../pages/LiveMapPage'
import NewsPage from '../pages/NewsPage'

function MyRouter() {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/live' element={<LiveMapPage />} />
    </Routes>
  )
}

export default MyRouter