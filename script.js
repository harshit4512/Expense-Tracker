document.addEventListener('DOMContentLoaded',()=>{

const expenseform= document.getElementById("expense-form");
const expensename= document.getElementById("expense-name");
const expenseamount= document.getElementById("expense-amount"); 
const expensebtn= document.getElementById("expense-btn");
const expenselist= document.getElementById("expense-list")
const totalamount= document.getElementById("total-amount");

let expensecart = JSON.parse(localStorage.getItem("expense")) || [];

 expensecart.forEach(exp => renderexpense(exp));

expenseform.addEventListener('submit',(e)=>{

    e.preventDefault()
    const expensetext =expensename.value.trim();
    const expenseamt =Number(expenseamount.value.trim());
    if(expensetext==="") return;
    if(expenseamt===0) return;

    const newexpense={
        name:expensetext,
        amount:expenseamt
    }
    
    expensecart.push(newexpense);
    saveexpense();
    renderexpense(newexpense);
    console.log(expensecart);
    
    expensename.value="";
    expenseamount.value="";

})

function renderexpense(expense){
    const li=document.createElement('li');
     li.className = "flex justify-between items-center bg-[#333333] text-white px-4 py-3 mb-2 rounded-lg shadow";

     li.innerHTML=`
     <span>${expense.name}-$${expense.amount}</span>
      <button class="delete-btn  bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-900 transition">Delete</button>
     `
     expenselist.appendChild(li);


     li.querySelector('button').addEventListener('click',(e)=>{
          e.stopPropagation();
          li.remove();
           expensecart = expensecart.filter(e => !(e.name === expense.name && e.amount === expense.amount));
          saveexpense();
          updatetotal();
     })

     updatetotal();
}

function updatetotal(){
       let total=0;
       expensecart.forEach((item,index)=>{
            total=total+Number(item.amount);
        })
        totalamount.textContent=`${total.toFixed(2)}`
}


function saveexpense(){
    localStorage.setItem('expense',JSON.stringify(expensecart))
}


})