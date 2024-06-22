import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Kudoslist from "../Kudoslist";
import KudosBoardModal from "../KudosBoardModal";
import KudosBoard from "../KudosBoard";

function PageOne() {
    const navigate = useNavigate();
    const [kudoBoards, setKudoBoards] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState(false);
    const [filter, setfilter] = useState([]);

    useEffect(() => {
        fetchKudoBoards();
    }, []);
    const fetchKudoBoards = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoBoard`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setKudoBoards(data);
            })
            .catch((error) => {
                console.error("Error fetching kudosBoard:", error);
            });
    };
    const handleCreateKudoBoard = (newKudosBoard) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudoBoard`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newKudosBoard),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                fetchKudoBoards();
            })
            .catch((error) => {
                console.error("Error fetching kudosBoard:", error);
            });
    };
    const handleDeleteKudoBoards = async (boardId) => {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_ADDRESS}/kudoBoard/${boardId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.ok !== true) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            setKudoBoard(
                kudoBoard.filter((kudoboard) => kudoboard.id !== boardId)
            );
        }
    };
    // search with input
    const handleSearchKudoBoards = async () => {
        const response = await fetch(
            `${
                import.meta.env.VITE_BACKEND_ADDRESS
            }/kudoBoard?search=${searchQuery}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setKudoBoards(data);
                // console.log(kudoBoard)
            })
            .catch((error) => {
                console.error("Error fetching kudosCard", error);
            });
    };
    // filter buttons
    const handleFilterKudoBoards = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_ADDRESS}/kudoBoard?search=${filter}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setKudoBoards(data);
                // console.log(kudoBoard)
            })
            .catch((error) => {
                console.error("Error fetching kudosCard", error);
            });
    };

    const boards = kudoBoards.map((board, idx) => {
        // console.log(kudoscard)
        return (
            <KudosBoard
                key={idx}
                id={board.id}
                title={board.title}
                category={board.category}
                image={board.image}
                description={board.description}
                author={board.author}
                onDelete={() => handleDeleteKudoBoards(board.id)}
            />
        );
    });

    return (
        <>
            <header className="appheader">
                <h1>Kudos board</h1>
                <input
                    type="search"
                    placeholder="search for.."
                    className="input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                ></input>
                <button
                    onClick={() => {
                        handleSearchKudoBoards();
                        setSearch(true);
                    }}
                >
                    {" "}
                    search
                </button>
                <div className="buttonclass">
                    <button className="buttonclass"> all </button>
                    <button className="buttonclass"> recent</button>
                    <button className="buttonclass"> celebration</button>
                    <button className="buttonclass">thank you </button>
                    <button className="buttonclass"> inspiration</button>
                    <button
                        className="btn btn-outline-primary mx-1 my-1"
                        data-bs-toggle="modal"
                        data-bs-target="#createBoardModal"
                    >
                        create a New Board
                    </button>
                </div>
            </header>
            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map((card) => (
                        <li key={card.id}>{card.title}</li>
                    ))}
                </ul>
            )}
            {boards}
            <footer className="footer">
                {" "}
                &copy; kudosboard.com All rights reserved
            </footer>
            <KudosBoardModal handleCreateKudoBoard={handleCreateKudoBoard} />
        </>
    );
}
export default PageOne;
