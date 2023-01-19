import './App.css';
import {useState,useEffect} from 'react';


function App() {

  const [gameTitle, setgameTitle] = useState("")
  const [searchedgames, setsearchedGames] = useState([])
  const [gameDeals, setgameDeals] = useState([])

  const searchGame=()=>{
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
    .then((response) => response.json())
    .then((data) => {
      setsearchedGames(data)
    })
  }

  useEffect(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=3`)
    .then((response) => response.json())
    .then((data) => {
      setgameDeals(data)
      console.log(data)
    })
  }, [])
  

  return (
    <div className="App">
      <div className="searchSection">
        <h1>Search For A Game</h1>
        <input type="text" placeholder="Minecraft...." onChange={(e)=>{setgameTitle(e.target.value)}} />
        <button onClick={searchGame}>Search Game Title</button>
      
        <div className='games'>
        {searchedgames.map((game,key)=>{
          return <div className='game' key={key}>
            {game.external}
            <img src={game.thumb}/>
            {game.cheapest}
          </div>
        })}
      </div>
      
      
      </div>
      <div className="dealSection">
        <h1>Latest Deals </h1>
        <div className='games'>
        {gameDeals.map((game,key)=>{
          return <div id='deals' className='game' key={key}>
            <h3>{game.title}</h3>
            <p>Normal Price:{game.normalPrice}</p>
            <p>Deal Price:{game.salePrice}</p>
            <h3>YOU SAVE {game.savings.substr(0,2)}%</h3>
          </div>
        })}
      </div>
      </div>
    </div>
  );
}

export default App;
