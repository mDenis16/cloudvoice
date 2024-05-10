import React from "react";
import puppeteer from "@cloudflare/puppeteer";

let paysafe = async () => {
  const url =
    "https://www.tipeeestream.com/v3.0/shop-donation/streamers/axe-hurracan/orders";
  const body = {
    paymentMean: { method: "ADYEN", options: { adyen_type: "PAYSAFECARD" } },
    parameters: {
      fees: true,
      username: "saadsa",
      message: "asdafs",
      email: "asd@sa.ro",
      mediaplayer: null,
      mediaplayerTiming: null,
    },
    profile: { firstName: null, lastName: null },
    items: [{ amount: "1.00", donationType: "STANDALONE", takenRewards: [] }],
  };

  let result = await fetch(url, {
    method: "POST",
    headers: {
      "sec-ch-ua":
        '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99"',
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=UTF-8",
      "sec-ch-ua-mobile": "?0",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
      "sec-ch-ua-platform": '"Windows"',
      Origin: "https://www.tipeeestream.com",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      Referer: "https://www.tipeeestream.com/axe-hurracan/donation",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
    },
    body: JSON.stringify(body),
  });
  console.info(result);
};
export default paysafe;
// let Page = async () => {
//   let makeAutoPayment = () => {
//     console.info('cristos')
//     let creditCardBtn = document.getElementsByClassName(
//       'cart-streamer-payment w10'
//     )[0] as HTMLDivElement;
//     console.info('creditCardBtn ' +creditCardBtn )
//     if (!creditCardBtn) return;
//     creditCardBtn.click();
//   };
//   return (
//     <div>
//       auto payment
//       <div style={{ background: "red", width: 100, height: 50 }} onClick={makeAutoPayment}>
//         Freaca-l vere
//       </div>
//       <iframe id={'mata'}
//         style={{ width: 1280, height: 720 }}
//         src="https://www.tipeeestream.com/axe-hurracan/donation/"
//       ></iframe>
//     </div>
//   );
// };
// export default Page;
