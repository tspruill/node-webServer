

const locationData = document.querySelector('Form')
const submitData = document.querySelector("input[type='text']")
const message1 = document.querySelector("#m1")
const message2 = document.querySelector("#m2")

locationData.addEventListener('submit',(event)=>{
    event.preventDefault()
    
    message1.textContent = "Loading..."
     message2.textContent = " "
    fetch('http://localhost:3000/weather?address='+submitData.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           return  message1.textContent = data.error
        }
        
        message1.textContent = "Current Location is: " + data.location
        message2.textContent = data.forcast
    })
})
    
    
    
    console.log('It works')
})