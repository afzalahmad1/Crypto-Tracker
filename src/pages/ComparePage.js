import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import SelectCoins from "../components/Compare/SelectCoins";
import SelectDays from "../components/Coin/SelectDays";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import { coinObject } from "../functions/coinObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/Coininfo";
import { settingChartData } from "../functions/settingChartData";
import LineChart from "../components/Coin/LineChart";

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState(null);
  const [crypto2Data, setCrypto2Data] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [priceType, setPriceType] = useState("prices");
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});

  function handleDaysChange(event) {
    setDays(event.target.value);
  }

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setIsLoading(true);
    const data1 = await getCoinData(crypto1);

    if (data1 != null || data1 !== undefined) {
      const data2 = await getCoinData(crypto2);
      coinObject(setCrypto1Data, data1);
      if (data2 != null || data2 !== undefined) {
        coinObject(setCrypto2Data, data2);
        const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(crypto2, days, priceType);
        settingChartData(setChartData, prices1, prices2);
        // console.log("prices1"+prices1);
        // console.log("prices2"+prices2);
        setIsLoading(false);
      }
    }
  }

  const handleCoinChange = async (event, isCoin2) => {
    setIsLoading(true);
    if (isCoin2) {
      setCrypto2(event.target.value);
      const data = await getCoinData(event.target.value); //here event.data.value == id
      // console.log("data"+ data);
      coinObject(setCrypto2Data, data);
      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(crypto2, days, priceType);
      if (prices1.length > 0 && prices2.length > 0) {
        // settingChartData(setChartData, prices);
        // console.log(" pricess1111====>",prices1);
        // console.log(" pricess22222====>",prices2);
        setIsLoading(false);
      }
    } else {
      setCrypto1(event.target.value);
      //console.log("cr1",event.target.value);
      const data = await getCoinData(event.target.value); //here event.data.value == id
      coinObject(setCrypto1Data, data);
    }
  };
  if (crypto1Data == null || crypto2Data == null) return null;
  return (
    <div>
      <Header />
      <div className="coins-days-flex">
        <SelectCoins
          crypto1={crypto1}
          crypto2={crypto2}
          handleCoinChange={handleCoinChange}
        />
        <SelectDays
          days={days}
          handleDaysChange={handleDaysChange}
          noPTag={true}
        />
      </div>

      <div className="grey-wrapper" style={{ padding: "0rem 1rem" }}>
        <List coin={crypto1Data} />
      </div>
      <div className="grey-wrapper" style={{ padding: "0rem 1rem" }}>
        <List coin={crypto2Data} />
      </div>
      <div className="grey-wrapper">
            <LineChart chartData={chartData} priceType={"prices"} multiAxis={true}/>
      </div>

      <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
      <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
    </div>
  );
}

export default ComparePage;
