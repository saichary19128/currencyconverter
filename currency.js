const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdowns=document.querySelectorAll(".dropdown select");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");
let btn=document.querySelector("button");
for(let select of dropdowns){
    for(let code in countryList){
        let newoptions=document.createElement("option");
        newoptions.value=code;
        newoptions.innerText=countryList[code];
        select.append(newoptions);
        if(select.name==="from" && code=="USD"){
            newoptions.selected=true;
        }
        else if(select.name==="to" && code=="INR"){
            newoptions.selected=true;
        }
    }
    select.addEventListener("change",(eve)=>{
        changeflag(eve.target);
    });
}
const updatecurr= async(eve)=>{
    let amount=document.querySelector(".amount input");
    let amountval=amount.value;
    if(amountval==""||amountval<1){
        amount.value="1";
        amountval=1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtountval * rate;
    msg.innerText = `${amountval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  };
const changeflag=(element)=>{
    let code=element.value;
    let countryCode=countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};
btn.addEventListener("click",()=>{
    updatecurr(eve);
});
window.addEventListener("load",()=>{
    updatecurr();
});

