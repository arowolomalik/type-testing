let currentText = "";

fetch("./data.json")
.then(res => res.json())
.then(data => {

    // alert('once you are done typing, type any random letter after, for the result to show')

    document.getElementById('record').textContent = localStorage.getItem('highscore')

    let gameactive = false;
    
    const btns = document.querySelectorAll('.difficulty button')
     
  
    window.onload = (
        document.querySelector('.text p').textContent = data.easy[Math.floor(Math.random()*data.easy.length)].text
    )
    currentText =  document.querySelector('.text p').textContent;

        btns.forEach( btn => {
    let text = document.querySelector('.text p');
       btn.addEventListener('click', function question(){
        const easy = data.easy[Math.floor(Math.random()*data.easy.length)].text;
        const medium = data.medium[Math.floor(Math.random()*data.medium.length)].text;
        const hard = data.hard[Math.floor(Math.random()*data.hard.length)].text;

        if(btn.id === 'medium'){ 
            text.textContent = medium;
            currentText = medium
            
       }else if(btn.id === 'easy'){
            text.textContent = easy;
            currentText = easy
            
       }else if(btn.id === 'hard'){
            text.textContent = hard;
            currentText = hard   
       }
       console.log(currentText)
    })
     })

     document.getElementById('difficulty').addEventListener('change', function selection(){
        console.log(this.value)
        let text = document.querySelector('.text p');
         const easy = data.easy[Math.floor(Math.random()*data.easy.length)].text;
        const medium = data.medium[Math.floor(Math.random()*data.medium.length)].text;
        const hard = data.hard[Math.floor(Math.random()*data.hard.length)].text;

         if(this.value === 'medium'){ 
            text.textContent = medium;
            currentText = medium
            
       }else if(this.value === 'easy'){
            text.textContent = easy;
            currentText = easy
            
       }else if(this.value === 'hard'){
            text.textContent = hard;
            currentText = hard   
       }


     })
     

    function displayText(text){
        const container = document.querySelector('.text p')
        container.innerHTML = "";


        let singles = text.split("")
        console.log(singles)
      
        singles.forEach(word => {
            const span = document.createElement("span");
            span.textContent = word
            container.appendChild(span)
        })
     }


        let currentIndex = 0;
        let correctCount = 0;
        let incorrectCount = 0;
        let highlightnext = 1;
        let hightlightremove = 0;
        let timeleft = 60
        let accuracy = 0
        let wpm = 0
        let mobileinput
       


   function characterOnScreen(){
    document.getElementById('mobileinput').addEventListener("input", (e)=>{
    

    const typedKey = e.target.value.slice(-1);
    const letters = document.querySelectorAll(".text span")
    const addhighlight = letters[highlightnext] 
    const removehightlight = letters[hightlightremove]
    const currentLetter = letters[currentIndex];
    console.log(letters.length)
     let currentLineTop = letters[currentIndex];
    
    
    
   

    const ignoreKeys = ["Shift","CapsLock","Alt","Control","Meta","Tab","Enter","ArrowLeft","ArrowRight"];
    if(ignoreKeys.includes(typedKey)) return;

    if(!currentLetter)return
    if(typedKey.toLowerCase() === currentLetter.textContent.toLowerCase()){
        currentLetter.classList.add("correct")
        correctCount++
              
    }else{
        currentLetter.classList.add("wrong")
        incorrectCount++
    }

    currentIndex++

   
    const nextLetter = letters[currentIndex];
    if (nextLetter) {
      const textContainer = document.querySelector(".text");
      textContainer.scrollTop = nextLetter.offsetTop - 80;
    }

    
        if(!gameactive)return;
       if(currentIndex === letters.length){
        endGame(correctCount, incorrectCount);

    }

    if(addhighlight){
        addhighlight.classList.add("highlight")
    highlightnext++
    }
    
    
    removehightlight.classList.remove("highlight")
    hightlightremove++


    let totalTyped = correctCount + incorrectCount;
    accuracy = (correctCount/totalTyped) * 100

    document.getElementById("accurate").textContent = `${Math.floor(accuracy)} %`;
    document.getElementById("accurate").style.color = 'hsl(354, 63%, 57%)';
    document.getElementById('mobileinput').value = "";
})}
 characterOnScreen()

      
       
   let timeleftscreen = Number(document.getElementById('timeleft').textContent)
      document.getElementById('timeSelection').addEventListener('change', function timetochoose(){
        // if(gameactive) return;
        if(this.value === "sixty"){
            timeleft = 60;
            document.getElementById('timeleft').textContent = '60'
        }else if(this.value === "ninety"){
            timeleft = 90;
            document.getElementById('timeleft').textContent = '90'

        }else if(this.value === "fifteen"){
            timeleft = 150;
            document.getElementById('timeleft').textContent = '150'

        }

        timeleftscreen = Number(document.getElementById('timeleft').textContent)
        console.log(timeleftscreen)
        
    })
     
        
      let timeinterval
function time(){

     timeinterval = setInterval(() => {
        if(timeleft!=0){
            timeleft--
        }
        if(!gameactive)return;

        if(timeleft === 0){
            endGame(correctCount,incorrectCount);
        }
        document.getElementById('timeleft').textContent = timeleft
        document.getElementById('timeleft').style.color = 'hsl(49, 85%, 70%)'



        let timepassed = timeleftscreen - timeleft;
        let minutes = timepassed / timeleftscreen;
        let wordPerMinute = correctCount/5;

        wpm = wordPerMinute/minutes

        document.getElementById('wpmf').textContent = Math.floor(wpm);
        }, 1000);
}
      


    document.getElementById('start').addEventListener('click', start)


    function start(){
        gameactive = true
        document.querySelector('.text').style.filter = 'none';
        displayText(currentText);
        document.getElementById('mobileinput').focus();
         time();
         document.getElementById('start').style.display = 'none';
         document.getElementById('restart').style.display = 'flex';
    }

    document.querySelector(".text").addEventListener("click", () => {
    document.getElementById("mobileinput").focus()
})


     

    

    

    function endGame(correct,wrong){
        gameactive = false;
        
        document.querySelector('.one').style.display = 'none'
        document.querySelector('.two').style.display = 'flex'
        document.getElementById('correct').textContent = correct;
        document.getElementById('wrong').textContent = wrong;
        document.getElementById('accscore').textContent =  document.getElementById("accurate").textContent;
        document.getElementById('wpmscore').textContent =  document.getElementById('wpmf').textContent;

        let score = Number(document.getElementById('wpmf').textContent) 
        let highscore =  Number(localStorage.getItem('highscore'))  ;
       
        

        if(highscore === null){
            document.querySelectorAll('.baseline').forEach(base => {
                base.style.display = 'block'
            })
            document.querySelectorAll('.normal').forEach(normal => {
                normal.style.display = 'block'
            })
            document.querySelectorAll('.highscore').forEach(high => {
                high.style.display = 'none'
            })
            document.querySelectorAll('.testComplete').forEach(test => {
                test.style.display = 'none'
            })
        }else if(score > highscore){
             document.querySelectorAll('.baseline').forEach(base => {
                base.style.display = 'none'
            })
            document.querySelectorAll('.normal').forEach(normal => {
                normal.style.display = 'none'
            })
            document.querySelectorAll('.highscore').forEach(high => {
                high.style.display = 'block'
            })
            document.querySelectorAll('.testComplete').forEach(test => {
                test.style.display = 'none'
            })
        }else if(highscore >= score){
              document.querySelectorAll('.baseline').forEach(base => {
                base.style.display = 'none'
            })
            document.querySelectorAll('.normal').forEach(normal => {
                normal.style.display = 'block'
            })
            document.querySelectorAll('.highscore').forEach(high => {
                high.style.display = 'none'
            })
            document.querySelectorAll('.testComplete').forEach(test => {
                test.style.display = 'block'
            })
        }


        if(!highscore){
           localStorage.setItem('highscore', score )
           highscore = score

        }

        if(score > highscore ){
            localStorage.setItem('highscore', score)
            highscore = score
    
        }

        document.getElementById('record').textContent = highscore
       
    }

    // document.getElementById('passage').addEventListener('click', function passage(){
    //     clearInterval(timeinterval)
    // })

    function again(){ 
        alert('select the difficulty you want')
        document.querySelector('.one').style.display = 'block'
        document.querySelector('.two').style.display = 'none'
        currentIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        timeleft = 60;
        accuracy = 0;
        wpm = 0;
        
        highlightnext = 1;
        hightlightremove = 0;
        document.getElementById('timeleft').textContent = "60"
        timeleftscreen=Number(document.getElementById('timeleft').textContent);
        document.getElementById('accurate').textContent = "100%"
        document.getElementById('wpmf').textContent = 0;
         clearInterval(timeinterval)

         

        document.querySelectorAll(".text span").forEach(letter =>{
            letter.classList.remove("correct","wrong","highlight")
        })

        displayText(currentText);
        document.querySelector('.text').style.filter = 'blur(5px)'
        document.getElementById('start').style.display = 'flex'
        document.getElementById('restart').style.display = 'none'
    }

    document.getElementById('beatscore').addEventListener('click', again)
    document.getElementById('clearRecord').addEventListener('click', function clearLocalstorage(){
        localStorage.clear();
        document.getElementById('record').textContent = "";
    })

    document.getElementById('restart').addEventListener('click', again)


    
    
})

// localStorage.clear()









