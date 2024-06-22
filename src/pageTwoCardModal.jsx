import { useState } from "react";
function PageTwoCardModal({ boardId, handleCreateKudoCard, closeModal}){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [author, setAuthor] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [apiData, setapiData] = useState([])
    const [searchedgif, setsearchedgif] = useState("")   
    const handleCreateButton = (event) => {
        console.log("clicking")
        console.log(searchedgif)
        handleCreateKudoCard({ kudoBoardId: parseInt(boardId), author: author, gifUrl: searchedgif, title:title, description: description})
    }
    const fetchgiphy = async () => {
        try {
            const apikey = import.meta.env.VITE_GIPHY_KEY;
            const response = await fetch( 
                "http://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + searchQuery,
            );
            const data = await response.json();
            console.log(data);
            setapiData(data.data);

        } catch (error) {
            console.error(error);
        }
        return null;
    };
    const giphydata = apiData.map((eachgif) => {
        // console.log(eachgif)
        return (
            <div onClick={() =>  {setsearchedgif(eachgif.images.downsized.url)}}> 
                <img src= {eachgif.images.downsized.url}></img>
            </div>
        );              
    });
    
    
    return(
        <>
            <div class="modal" id ="createCardModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                
                <div className = "row">
                    <div className="col-3">board Title:</div>
                    <div className="col-9">
                        <input type="text" className ="form-control" placeholder= "enter card title" id ="cardBoardTitle" onChange={(e) => setTitle(e.target.value)}></input>
                     </div>
                </div>
                <div className = "row">
                    <div className="col-3">description:</div>
                    <div className="col-9">
                        <input type="text" className ="form-control" placeholder= "description goes here" id ="cardBoardDescription" onChange={(e) => setDescription(e.target.value)}></input>
                     </div>
                </div> 
                <input type="search" placeholder= "search for.." className='input' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} ></input>
                <button onClick={(e) => {fetchgiphy()}
                }> search</button>
                <div>
                  {giphydata}
                </div>
                <input value={searchedgif} onChange={(e) => setImageUrl(e.target.value)}></input>
                <div className = "row">
                    <div className="col-3">author: </div>
                    <div className="col-9">
                        <input type="text" className ="form-control" placeholder= "enter owner(optional)" id ="cardBoardAuthor" onChange={(e) => setAuthor(e.target.value)}></input>
                     </div>
                </div> 
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                    <button type="button" class="btn btn-primary" onClick={handleCreateButton}>Save changes</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}
export default PageTwoCardModal