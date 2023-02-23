import getData from "./users.js";

const tbody = document.querySelector("tbody");
getData()
       .then((response)=>response.json())
       .then((data) => {
                 showUser(data)
          const btnXoa = document.querySelectorAll(".btn-remove")
          for(let btn of btnXoa) {
             const id = btn.dataset.id;
             btn.addEventListener("click",function(){
                return removeUser(id);
             })
          }       

          const btnUpdates = document.querySelectorAll(".btn-update")
          for(let btn of btnUpdates){
              const id = btn.dataset.id;
              btn.addEventListener("click",function(){
                  return updateUser(id)
              })
          }    
       })
       const removeUser = (id) => {
        fetch(`http://localhost:3000/users/${id}`,{
            method:"DELETE"
        })
    }
const showUser = (data) =>{
        tbody.innerHTML = data.map((user,index) => {
        return `
           <tr>
               <td>${index + 1}</td>
               <td>${user.name}</td>
               <td>
                <button data-id="${user.id}" class="btn-remove">Xoa</button>
                <button data-id="${user.id}" class="btn-update">Sua</button>
               </td>
           </tr>
        `
        }).join("");
}

const addUser = () =>{
        document.querySelector("body").innerHTML = `
        <form action="">
           <input  type="text" id = "username">
           <button id="btn-submit">Them</button>
        </form>
        `
        document.querySelector("#btn-submit").addEventListener("click", function(){
            const userNew = {
                 "name" : document.querySelector("#username").value
            }
            fetch(`http://localhost:3000/users`,{
                method:"POST",
                headers:{
                   "Content-Type": "application/json",
                },
                body:JSON.stringify(userNew)
            })
        })
}
document.querySelector("#btn-add").addEventListener("click",addUser);

const updateUser = (id) =>{
      fetch(`http://localhost:3000/users/${id}`)
         .then((response)=>response.json())
        .then((data) => {
            document.querySelector("body").innerHTML = `
            <form action="">
               <input  type="text" id = "username" value = "${data.name}"/>
               <button id="btn-update">Sua</button>
            </form>
            `
      
        document.querySelector("#btn-update").addEventListener("click", function(){
            const userNew = {
                "id" : id,
                 "name" : document.querySelector("#username").value
            }
            fetch(`http://localhost:3000/users/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(userNew)
            })
        })
    })
}