
let revenueArray = [];
let expenseArray = [];

let total1;  // Total for revenues
let total;   // Total for expenses

function clearInputRev() {
    document.getElementById('revenue-value').value = '';
}

function clearInputExp() {
    document.getElementById('expense-value').value = '';
}

function showingArrays() {
    const revContainer = document.getElementById("revArray");
    revContainer.textContent = '';  // Clear previous items

    revenueArray.forEach((rev) => {
        const revItem = document.createElement('div');
        const revItemBtn = document.createElement('button');
        revItemBtn.textContent = 'Delete';
        revItem.textContent = rev;

        revItem.id = "element";

        revContainer.appendChild(revItem);
        revItem.appendChild(revItemBtn);

        revItemBtn.addEventListener("click", () => {
            revenueArray.splice(revenueArray.indexOf(rev), 1);  // Remove the revenue item
            showingArrays();
            calculateRevenueTotal();
        });
    });

    calculateRevenueTotal();
}

function calculateRevenueTotal() {
    total1 = revenueArray.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue);
    }, 0);  
    console.log("Total Revenue: " + total1);  
}

function showingArrays2() {
    const expContainer = document.getElementById("expArray");
    expContainer.textContent = '';  // Clear previous items

    expenseArray.forEach((exp, index) => {
        const expItem = document.createElement('div');
        const expItemBtn = document.createElement('button');
        expItemBtn.textContent = 'Delete';
        
        expItemBtn.id = index;  // Assign the index as the button's ID
        
        expItem.textContent = exp;
        expItem.id = "element";

        expContainer.appendChild(expItem); 
        expItem.appendChild(expItemBtn);

        expItemBtn.addEventListener("click", () => {
            expenseArray.splice(index, 1);  // Remove the expense item
            
            calculateExpenseTotal();
            showingArrays2();
            hideTheCurrentTotal();  // Hide balance when an item is deleted
        });
    });
}

function calculateExpenseTotal() {
    total = expenseArray.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue);
    }, 0);
    console.log("Total Expense: " + total);
}

function AddRevenue() {
    const revenueValue = document.getElementById("revenue-value").value;
    const wrongInput = document.getElementById("Tryagain2");

    if (isNaN(revenueValue) || revenueValue.trim() === "") {
        wrongInput.textContent = alert("Numbers only, try Again!");
        clearInputRev();
    } else {
        wrongInput.textContent = "";
        revenueArray.push(revenueValue);
        showingArrays();
        clearInputRev();
        
        // Update the displayed revenue total
        document.getElementById("revenue").textContent = "£" + total1;
    }
}

function AddExpense() {
    hideTheCurrentTotal();  // Hide current balance when adding a new expense

    const expenseValue = document.getElementById("expense-value").value;  // Correct variable name
    const wrongInputExp = document.getElementById("TryagainExp");

    if (isNaN(expenseValue) || expenseValue.trim() === "") {
        wrongInputExp.textContent = alert("Numbers only, try Again!");
        clearInputExp();
    } else {
        wrongInputExp.textContent = "";
        expenseArray.push(expenseValue);
        showingArrays2();
        clearInputExp();

        // Update the displayed expense total
        document.getElementById("expense").textContent = "£" + total;
    }
}

function hideTheCurrentTotal() {
    const balanceContainer = document.querySelector(".curent_balance");
    balanceContainer.style.display = "none"; 
}

function showCurrent() {
    const totalCurrentRevenue = parseFloat(document.getElementById("revenue").innerHTML.replace("£", "")) || 0;
    const totalCurrentExpense = parseFloat(document.getElementById("expense").innerHTML.replace("£", "")) || 0;

    const balanceContainer = document.querySelector(".curent_balance");
    const currentBalance = document.getElementById("current-balance");

    const balance = totalCurrentRevenue - totalCurrentExpense;

    if (balanceContainer.style.display === "none" || balanceContainer.style.display === "") {
        balanceContainer.style.display = "block";
        currentBalance.textContent = "£" + balance;
    } else {
        balanceContainer.style.display = "none";
    }
}



