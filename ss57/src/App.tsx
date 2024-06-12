import React from 'react'
import Bt1 from './components/Bt1'
import Bt2 from './components/Bt2'
import Bt3 from './components/Bt3'
import Bt4 from './components/Bt4'
import Bt5 from './components/Bt5'
import Bt6 from './components/Bt6'
import StudentList from './components/Bt7+8+9+10/StudentList'
import Loading from './components/Bt7+8+9+10/Loading'

export default function App() {
  return (
    <div className="App">App
      Bài 1
      <Bt1/>
      Bài 2
      <Bt2/>
      Bài 3
      <Bt3 id={2}/>
      Bài 4
      <Bt4/>
      Bài 5
      <Bt5/>
      Bài 6
      <Bt6/>
      Bài 7+8+9+10
      <header className="App-header">
        <StudentList />
      </header>
      
    </div>
  )
}
