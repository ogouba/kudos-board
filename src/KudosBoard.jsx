import './KudosBoard.css';
import { Link }from "react-router-dom";

function KudosBoard({title, category, image, description, author, onDelete, id}) {
// const Kudoscard = ()
    return(
        <>
            <div className = "kudosCard">
                <img id="kudosCardImage" src ='https://picsum.photos/199/300'></img>
                <h3 className= "kudosCardTitle">title: {title}</h3>
                <h3 className= "kudosCardCategory">category: {category}</h3>
                <h3 className= "kudosCardDescription">description:{description}</h3>            
                <h3 className= "kudosCardAuthor">author:{author}</h3>
                <Link to={`/kudoBoard/${id}`}> View Board</Link>
                <button className='KudosCardButtonCreate' onClick={onDelete} > Delete Board </button>
            </div>
        </>
    )
}

export default KudosBoard
