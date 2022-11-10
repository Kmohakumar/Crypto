import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Coin  from './Coin.js'

function App() {
  const [Coins , setCoins] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false')
  .then(res => {
    setCoins(res.data);
    console.log(res.data);
  })
  .catch(err=> console.log('error'));
 });

 const handlechange = e =>{
    setSearch(e.target.value);
 }
 const filteredcoins = Coins.filter(coin=>
  coin.name.toLowerCase().includes(search.toLowerCase())
 )
  return (
    <div className="coin-app">
      <div className="coin-search">
      <h1 className="coin-text">Crypto Center</h1>
      <form>
        <input type='text' placeholder='search' className='coin-input' onChange={handlechange}></input>
      </form>
      {filteredcoins.map(coin=> {
      return(
        <Coin key={coin.id} 
        name={coin.name}
        price={coin.current_price}
        image={coin.image}
        symbol={coin.symbol}
        volume={coin.total_volume}
        priceChange={coin.price_change_percentage_24h}
        marketcap={coin.market_cap}/>
      )
})}
    </div>
    </div>
  );
}


export default App;
