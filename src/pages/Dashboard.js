import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import axios from "axios";
import Search from "../components/Dashboard/Search";
import PaginationComponent from '../components/Dashboard/Pagination'
import Loader from '../components/Common/Loader'
import BackToTop from '../components/Common/BackToTop'

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Pagination
  const [page, setPage] = useState(1)
  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value -1)*10;
    setPaginatedCoins(coins.slice(previousIndex,previousIndex + 10))
  };

  // state for search component
  const [search,setSearch] = useState("")

  //search function for search component
  const onSearchChange = (e)=>{
    setSearch(e.target.value)
  }
  var filteredCoin = coins.filter((item)=>{
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase())
    )
  })

  useEffect(()=>{
    axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
    .then((res)=>{
      setCoins(res.data)
      setPaginatedCoins(res.data.slice(0,10))
      setIsLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })
  },[]);
  return (
    <>
    <Header />
    <BackToTop />
    {isLoading?(
      <Loader />
    ) : (<div>
     
      <Search  search={search} onSearchChange={onSearchChange}/>
      <TabsComponent coins={search?filteredCoin : paginatedCoins} />
      {!search && <PaginationComponent  page={page} handlePageChange={handlePageChange}/>} 
    </div>
    )}
    </>
  );
}

export default DashboardPage;
