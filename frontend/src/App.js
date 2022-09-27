import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import{ Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
<<<<<<< HEAD
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
=======
import HomeScreen from './components/HomeScreen'
>>>>>>> c6772743c5cf899f1ab5339c46fba95aa32d080e

const App = () => {
  return (
    <Router>
      <Header />
    <main className='py-3'>
      <Container>
<<<<<<< HEAD
        <Routes>
                <Route path='/' element={ <HomeScreen />}></Route>
                <Route path='/product/:id' element={<ProductScreen />}></Route>
        </Routes>
=======
                 <HomeScreen />
>>>>>>> c6772743c5cf899f1ab5339c46fba95aa32d080e
      </Container>
    </main>
    <Footer />
    </Router>
  )
}

export default App
