import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import KudosCard from "../kudoscard";
import PageOne from "./PageOne";
import PagetwoCard from "../Pagetwocard";

function boardpage() {    
    const { id } = useParams();
    const [boardData, setBoardData] = useState(undefined)
    useEffect(() => {
        // make an API call to board
        fetchkudosBoard()

    }, [])

    const fetchkudosBoard =() =>{
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoBoard/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setBoardData(data);
          console.log(data)
        })
        .catch(error => {
          console.error('Error fetching kudosCard:', error);
        });
    };

    // const [upvote, setupvote] = useState("");
    return (
        <>
            <header className="cardheader">
                <h1>Kudos board</h1>
            </header>
            <div className="body">
                <img src = ""></img>
                <button> create card </button>
                {
                    boardData == undefined ? 
                    <></>
                    :
                    <PagetwoCard
                    title={boardData["title"]}
                    author="b"
                />
                }
            </div>
            <footer className="footer">
                <p>&copy; kudosboard.com All rights reserved </p>
            </footer>
        </>
    );
}
export default boardpage;
                {/* <KudosCard
                    key={idx}
                    id={kudoscard.id}
                    title = {kudoscard.title}
                    category ={kudoscard.category}
                    image ={kudoscard.image}
                    description={kudoscard.description}
                    author = {kudoscard.author}
                    onDelete={() => handleDeleteKudoCards(kudoscard.id)} */}
                {/* /> */}
                {/* <input type= "text" placeholder="message.."></input>
                <input type = "text"placeholder="author.."></input> */}
                {/* <input type="text" className ="form-control" placeholder= "title goes here" id ="cardBoardTitle" onChange={(e) => setTitle(e.target.value)}></input> */}