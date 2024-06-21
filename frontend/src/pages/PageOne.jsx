import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import A'./App.jsx
import { useNavigate } from "react-router-dom";
import Kudoslist from '../Kudoslist';
import KudosCardModal from '../KudosCardModal'
import KudosCard from '../kudoscard'

function PageOne(){

    const navigate = useNavigate();
    const [kudoCard, setKudoCard] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState(false);
    const [filter, setfilter] = useState([]);
      
    useEffect(() => {
      fetchkudosCards();
    }, []);
       
    const fetchkudosCards =() =>{
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoBoard`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setKudoCard(data);
        })
        .catch(error => {
          console.error('Error fetching kudosCard:', error);
        });
    }; 
    
    const handleCreateKudoCards = (newKudosBoard) =>{
    //   console.log(newKudosBoard)
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoBoard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newKudosBoard)
          }
        )
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          fetchkudosCards();
        })
        .catch(error => {
          console.error('Error fetching kudosCard:', error);
        });
      }
    const handleDeleteKudoCards= async (boardId) =>{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoBoard/${boardId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (response.ok !== true ) {
              throw new Error(`HTTP error! status: ${response.status}`);
        }
        else{
          setKudoCard(kudoCard.filter(kudocard => kudocard.id !== boardId) );
        }
    //   console.log("clicked")
    }
    // search with input
    const handleSearchKudoCards = async () => {
      // console.log(searchQuery)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoBoard?search=${searchQuery}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setKudoCard(data) 
        // console.log(kudoCard)
      })
      .catch(error => {
        console.error('Error fetching kudosCard', error);
      });
    }; 
    // filter buttons 
    const handleFilterKudoCards =  async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoBoard?search=${filter}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setKudoCard(data) 
          // console.log(kudoCard)
        })
        .catch(error => {
          console.error('Error fetching kudosCard', error);
        });
    }
    
    const cards = kudoCard.map((kudoscard, idx) =>{
      // console.log(kudoscard)
      return(
        <KudosCard
          key={idx}
          id={kudoscard.id}
          title = {kudoscard.title}
          category ={kudoscard.category}
          image ={kudoscard.image}
          description={kudoscard.description}
          author = {kudoscard.author}
          onDelete={() => handleDeleteKudoCards(kudoscard.id)}
        />
      )
      })
    
      return (
        <> 
          <header className='appheader'> 
              <h1>Kudos board</h1>
              <input type="search" placeholder= "search for.." className='input' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} ></input>
              <button onClick={() => {
                handleSearchKudoCards()
                setSearch(true)}
              }> search</button>
              <div className='buttonclass'>
                  <button className='buttonclass'> all </button>
                  <button className='buttonclass' > recent</button>
                  <button className='buttonclass' > celebration</button>
                  <button className='buttonclass' >thank you </button>
                  <button className='buttonclass' > inspiration</button>
                  <button className="btn btn-outline-primary mx-1 my-1" data-bs-toggle="modal" data-bs-target = "#createBoardModal" >create a New Board</button>
              </div>      
          </header>
          {searchResults.length>0 && (
            <ul>
            {searchResults.map(card =>(
              <li key={card.id}>{card.title}</li>
            ))}
          </ul>
          )}          
          {cards}
          <footer className='footer'> &copy; kudosboard.com All rights reserved</footer>
          <KudosCardModal
            handleCreateKudoCards ={handleCreateKudoCards}
          />
        </>
      ) 
}
export default PageOne;