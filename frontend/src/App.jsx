// import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Kudoslist from './Kudoslist'
// import KudosCardModal from './KudosCardModal'
// import KudosCard from './kudoscard'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PageOne />}></Route>
                <Route path ="/kudoCard/:id" element= {<PageTwo />} />
                {/* <Route path= "/one" element={<PageOne />}></Route>
                <Route path="/two/:id" element={ <PageTwo />} /> */}
            </Routes>
        </Router>
    );
}
export default App;
// const [kudoCard, setKudoCard] = useState([]);
// const [searchQuery, setSearchQuery] = useState('');
// const [searchResults, setSearchResults] = useState([]);
// const [search, setSearch] = useState(false)

// useEffect(() => {
//   fetchkudosCards();
// }, []);

// const fetchkudosCards =() =>{
//     fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoCard`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       setKudoCard(data);
//     })
//     .catch(error => {
//       console.error('Error fetching kudosCard:', error);
//     });
// };

// const handleCreateKudoCards = (newKudosBoard) =>{
//   console.log(newKudosBoard)
//     fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoCard`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newKudosBoard)
//       }
//     )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       fetchkudosCards();
//     })
//     .catch(error => {
//       console.error('Error fetching kudosCard:', error);
//     });
//   }
// const handleDeleteKudoCards= async (boardId) =>{
//     const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoCard/${boardId}`,
//     {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     if (response.ok !== true ) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     else{
//       setKudoCard(kudoCard.filter(kudocard => kudocard.id !== boardId) );
//     }
//   console.log("clicked")
// }
// // const handleFilterKudoCards = async (category) =>{

// // }

// const handleSearchKudoCards = async () => {
//   // console.log(searchQuery)
//   const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoCard?search=${searchQuery}`)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => {
//     setKudoCard(data)
//     // console.log(kudoCard)
//   })
//   .catch(error => {
//     console.error('Error fetching kudosCard', error);
//   });
// };

// const cards = kudoCard.map((kudoscard, idx) =>{
//   // console.log(kudoscard)
//   return(
//     <KudosCard
//       key={idx}
//       title = {kudoscard.title}
//       category ={kudoscard.category}
//       image ={kudoscard.image}
//       description={kudoscard.description}
//       author = {kudoscard.author}
//       onDelete={() => handleDeleteKudoCards(kudoscard.id)}
//     />
//   )
//   })

//   return (
//     <>
//       <header className='appheader'>
//           <h1>Kudos board</h1>
//           <input type="search" placeholder= "search for.." className='input' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} ></input>
//           <button onClick={() => {
//             handleSearchKudoCards()
//             setSearch(true)}
//           }> search</button>
//           <div className='buttonclass'>
//               <button className='buttonclass'> all </button>
//               <button className='buttonclass' > recent</button>
//               <button className='buttonclass' > celebration</button>
//               <button className='buttonclass' >thank you </button>
//               <button className='buttonclass' > inspiration</button>
//               <button className="btn btn-outline-primary mx-1 my-1" data-bs-toggle="modal" data-bs-target = "#createBoardModal" >create a New Board</button>
//           </div>
//       </header>
//       {searchResults.length>0 && (
//         <ul>
//         {searchResults.map(card =>(
//           <li key={card.id}>{card.title}</li>
//         ))}
//       </ul>
//       )}

//       {cards}
//       <footer className='footer'> &copy; kudosboard.com All rights reserved</footer>
//       <KudosCardModal
//         handleCreateKudoCards ={handleCreateKudoCards}
//       />
//     </>
//   )
