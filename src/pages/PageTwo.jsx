import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PageOne from "./PageOne";
import PagetwoCard from "../Pagetwocard";
import PageTwoCardModal from "../pageTwoCardModal";

function boardpage() {
    const { id } = useParams();
    const [kudoCards, setKudoCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        fetchkudosCard();
    }, []);

    const fetchkudosCard = () => {
        fetch(
            `${import.meta.env.VITE_BACKEND_ADDRESS}/kudoBoard/${id}/kudoCard`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setKudoCards(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching kudosCard:", error);
            });
    };

    //delete function
    const handleDeleteKudoCard= async (cardId) =>{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoCard/${cardId}`,
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
          fetchkudosCard();
        }
    //   console.log("clicked")
    }
    // upvote function
    const handleUpvoteKudoCard= async (cardId) => {
        const cardIndex = kudoCards.findIndex(card => card.id === cardId)
        const upvoteCard = kudoCards[cardIndex]
        upvoteCard.likes = upvoteCard.likes + 1

        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoCard/${cardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(upvoteCard)
        })
        if (response.ok !== true ) {
              throw new Error(`HTTP error! status: ${response.status}`);
        }
        else{
          fetchkudosCard();
        }
    //   console.log("clicked")
    }
    const handleCreateKudoCard = (newKudosCard) =>{
           console.log(newKudosCard)
            fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoCard`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newKudosCard)
              }
            )
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              fetchkudosCard();
            })
            .catch(error => {
              console.error('Error fetching kudosCard:', error);
            });
          }

    const cards = kudoCards.map((card, idx) => {
        return (
            <PagetwoCard
                key={idx}
                id={card.id}
                title={card.title}
                image={card.gifUrl}
                author={card.author}
                likes={card.likes}
                handleUpvoteKudoCard={handleUpvoteKudoCard}
                handleDeleteKudoCard={handleDeleteKudoCard}
            />
        );
    });

    const openModal =() => {
        console.log("clicking modal")
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <header className="cardheader">
                <h1>Kudos board</h1>
            </header>
            <div className="body">
                <img src=""></img>
                <button className="btn btn-outline-primary mx-1 my-1" data-bs-toggle="modal" data-bs-target = "#createCardModal" >create a New card</button>
                {cards}
                {<PageTwoCardModal
                // gifUrl = {searchedgif}
                boardId = {id}
                handleCreateKudoCard={handleCreateKudoCard}
                closeModal={closeModal}
                />}
            </div>
            <footer className="footer">
                <p>&copy; kudosboard.com All rights reserved </p>
            </footer>
        </>
    );
}
export default boardpage;
