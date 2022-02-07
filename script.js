const drawer = document.getElementById("drawer")
const filterTab =document.getElementById("filter-tab")
const adjustFilter = document.getElementById("adjust-filter")
const colorsClass = document.getElementsByClassName("colors")
const addButton = document.getElementById("add-btn")
const cardListDiv = document.getElementById("cardList")
const doneBtn = document.getElementById("submit")
const titleInput = document.getElementById("title-input")
const subtitleInput = document.getElementById("subtitle-input")

//color value whenever user click to color in drawer tab
let chooseColor = 'rgb(255,255,255)'

// card array to store cards 
let cardArr=[]

// maintain current count of card in array
let currCount=0

// let cardArr=[{title: 'sfjbsdljbf dsfsdfs', subtitle: 'saflsd;f', color: 'rgb(182, 216, 192)'}

// ,{title: 'xjhvkjd lfgd', subtitle: 'kljfbdsljcg. o ghoi',color:'rgb(93, 65, 87)'}]

// FUNCTION: to fetch color using API
async function colorFetch() {
    const response = await fetch('https://random-flat-colors.vercel.app/api/random?count=6');
    const data = await response.json();
    let colorArray =  data.colors
    changeColor(colorArray)
}

// FUNCTION: to add background color to each button in color-palette div
function changeColor(colors){
    colors.forEach(element => {
        const btn = document.createElement("button")
        btn.style.backgroundColor =element
        btn.setAttribute("selected","1")
        const btn1 = document.createElement("button")
        btn1.style.backgroundColor =element
        colorsClass[0].appendChild(btn)
        colorsClass[1].appendChild(btn1)
    });
}


// calling color fetch as soon as web page is loading
colorFetch()

// Adding event listener to right drawer card to allot background color to each card
colorsClass[1].addEventListener("click", (e)=>{ 
    getColor(e.target)
    console.log("shashwat")
})

//FUNCTION: to get color rgb value from color button 
function getColor(e){
    chooseColor = e.style.backgroundColor
}


// Adding event listener on click to left filter-tab
colorsClass[0].addEventListener("click", (e)=>{ 
    findColor(e.target)
})


//FUNCTION: to filter card wih color selected in color palette on filter tab
function findColor(e){
    const clr = e.style.backgroundColor
    let filteredArray = cardArr.filter((obj)=>{
        if(obj.color===clr){
            return obj
        }
    }) 
    console.log(filteredArray)
    renderCard(filteredArray)
}

// OnClick function for "Add Creative" button to open drawer tab 
function createCard(){
    drawer.style.transition="0.5s"
    drawer.style.padding="0% 2% 0% 5%"
    drawer.style.width="33.5%"
    drawer.style.overflow="hidden"
    filterTab.style.width="57.7%"
    adjustFilter.style.width="95.2%"
    adjustFilter.style.overflow="auto"
    addButton.disabled =true
    drawer.style.right="0"
}

//FUNCTION: when close or done button clicked reset all parameters to empty  
const reset = function(){
    titleInput.value=""
    subtitleInput.value=""
    filterTab.style.width="100%"
    adjustFilter.style.width="56%"
    drawer.style.width = "0%"
    drawer.style.padding="0% 0% 0% 0%"
    chooseColor='rgb(255,255,255)'
    addButton.disabled=false
}



//FUNCTION: on click function to close button in drawer tab to close drawer 
function closeDrawer(){
    console.log("close clicked")
    addButton.disabled = false
    drawer.style.transform="translate-x(-33.5%)"
    reset()
}



doneBtn.disabled=true
let flag1 =true
let flag2 =true
    
titleInput.addEventListener("keyup" ,()=>{
    if(titleInput.value.length==0){
        flag1=true
    }else{
        flag1=false
    } 
    doneBtn.disabled=flag1||flag2
    console.log(flag1,flag2)
})

document.onkeydown = function(e){
    if(e.key=="Escape"){
        reset()
    }
}

subtitleInput.addEventListener("keyup" ,()=>{
    if(subtitleInput.value.length==0){
        flag2=true   
    }else{
        flag2=false
    } 
    doneBtn.disabled=flag1||flag2
})


// Function: when user clicks on done button to add card to list on left tab 
function AddToList(){
    flag1=true
    flag2=true
    cardArr.push({title:titleInput.value,subtitle:subtitleInput.value,color:chooseColor})
    console.log(cardArr)
    renderCard(cardArr)
    currCount++;
    const progressBar = document.getElementById("progress-bar")
    progressBar.value=currCount
    const cnt = document.getElementById("currCount")
    cnt.textContent=currCount
    reset()
  
    doneBtn.disabled=true
    checkCount()
}

// FUNCTION:  to check and keep count of cardArr length
function checkCount(){
    if(cardArr.length>=5){
        addButton.disabled=true
    }
}


// FUNCTION: renders the screen whenever ther is change cardArr
function renderCard(arr){
    cardListDiv.textContent=""
    arr.forEach(element => {
        const cardTitle = document.createElement("div")
        cardTitle.className ="card"
        const h1 = document.createElement("h1")
        h1.textContent=element.title
        h1.id="title"
        cardTitle.appendChild(h1)
        const h3 = document.createElement("h3")
        h3.textContent=element.subtitle
        h3.id="subtitle"
        cardTitle.style.backgroundColor = element.color
        cardTitle.appendChild(h3)
        cardListDiv.appendChild(cardTitle)
    });
}


//FUNCTION: to search cardARR to finc matching input value in input tag
const searchInput = document.getElementById("text-input")
searchInput.addEventListener("keyup",()=>{
    const val = searchInput.value
    let filteredArray = cardArr.filter((obj)=>{
        if(obj.title.includes(val)){
            return obj
        }
        if(obj.subtitle.includes(val)){
            return obj
        }
    }) 
   
    renderCard(filteredArray)
})            