   
 



const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const totalNetworht = document.getElementById("networth");


let transactionDateValue;
let addedAmountValue;
let transactionDescriptionValue;
let categoryValue;
let transactionBtn = document.getElementById("transaction-btn");
let currentDate = new Date();



let hideTransactionElement = document.getElementById("transaction");
let hideTransactionBtn = document.getElementById("hideTransaction-btn");
let hide = false;

function hideTransaction() {
    hideTransactionElement = document.getElementById('transaction'); 
   
    if (hideTransactionElement.style.display === "none") {
        hideTransactionElement.style.display = "block";
    } else {
        hideTransactionElement.style.display = "none";
    }
}


/*function hideTransactionAgain(){
    hideTransactionElement.style.display === "none";
}*/





transactionBtn.disabled = false;

function transaction(){

    

    const today = new Date().toISOString().split('T')[0];


    const transactionDateInput = document.getElementById("dateValue");
    transactionDateInput.setAttribute("min", today);


    transactionDateValue = transactionDateInput.value;
    transactionDescriptionValue = document.getElementById("description").value;
    addedAmountValue = document.getElementById("totalInputIncomeValue").value;
    categoryValue = document.getElementById("Category").value;

    if(
        
        isNaN(addedAmountValue) || addedAmountValue.trim() === ""
        || categoryValue.trim() === "" || transactionDateValue.trim() === ""
     ){
        
        alert("Unsuccessfull transaction ❌!; Please  fill in all the fields, check the fields!");
        clearFields();
    } 
       
    else{ 
        //addLatestRevenue();
        addTransactionRow()
        transactionType();
        calculatingNetworth();
        clearFields();
        hideTransactionElement.style.display = "none";
        alert("Your Transaction was Successful ✅")
       
    }

    
}

const transactionOptions = document.getElementsByName("typeOfTransaction");


let selectedOptions;
let isIncome = false;  

function transactionType() {
    transactionBtn.disabled = true;

    let selectedOptions = null; 
    for (const options of transactionOptions) {
        if (options.checked) {
            selectedOptions = options.value;
            isIncome = selectedOptions === "Income"; 
            break;
        }
    }

    if (isIncome) {
        totalIncome.textContent = "£" + addedAmountValue;
        totalRevenueArray.push(Number(addedAmountValue));
        calculatingRevenue();
        
    } else if (selectedOptions === "Expense") {
        totalExpense.textContent = "£" + addedAmountValue;
        totalExpenseArray.push(Number(addedAmountValue)); 
        calculatingExpense();
    } else {
        alert("Please select a transaction type");
        transactionBtn.disabled = true;
        return; 
    }

    transactionBtn.disabled = false; 
}

let totalExpenseSum = 0;
let totalRevenueSum = 0;

let totalRevenueArray = [];
let totalExpenseArray = [];

function calculatingExpense() {
    if (totalExpenseArray.length > 0) {
        totalExpenseSum = totalExpenseArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue; 
        }, 0);
    }
    console.log("Total Expenses: " + totalExpenseSum);
    console.log("Total Expenses array: " + totalExpenseArray);
    totalExpense.textContent = "£" + totalExpenseSum.toFixed(2);
}




function calculatingRevenue() {
    if (totalRevenueArray.length > 0) {
        totalRevenueSum = totalRevenueArray.reduce((accumulator, currentValue) => {
            return accumulator + currentValue; 
        }, 0);
    }
    console.log("Total Revenue: " + totalRevenueSum); 
    totalIncome.textContent = "£" + totalRevenueSum.toFixed(2); 
}



let networth;
function calculatingNetworth() {
    totalExpenseSum = totalExpenseArray.length > 0 ? totalExpenseArray.reduce((a, b) => a + b) : 0;
    totalRevenueSum = totalRevenueArray.length > 0 ? totalRevenueArray.reduce((k, j) => k + j) : 0;
    networth = "£" + (totalRevenueSum - totalExpenseSum).toFixed(2); 
    console.log("Net worth: " + networth);
    totalNetworht.textContent = networth;
}









function clearFields() {
    document.getElementById("dateValue").value = "";
    document.getElementById("description").value = "";
    document.getElementById("totalInputIncomeValue").value = "";
    document.getElementById("Category").value = "";
}

function addTransactionRow() {
    const newRow = document.createElement('tr');

    // Create common cells
    const dateCell = document.createElement('td');
    dateCell.textContent = transactionDateValue;
    newRow.appendChild(dateCell);

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = transactionDescriptionValue;
    newRow.appendChild(descriptionCell);

    const categoryCell = document.createElement('td');
    categoryCell.textContent = categoryValue;
    newRow.appendChild(categoryCell);

    const amountCell = document.createElement('td');
    amountCell.textContent = "£" + addedAmountValue;
    newRow.appendChild(amountCell);

    const inOutAmount = document.createElement('td');
    inOutAmount.textContent = !isIncome ? " +In" : " -Out";
    inOutAmount.style.backgroundColor = !isIncome ? "green" : "red";
    newRow.appendChild(inOutAmount);

      // Append the new row to the table body
    document.querySelector('#myTable tbody').appendChild(newRow);
}

      
           
       
       
    
    
   
 













   
   
   // Data for the Income vs Expenses Chart
   const incomeExpensesData = {
    labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'july',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    datasets: [{
        label: 'Income',
        data: [
           5000,
           6000,
           7000,
           8000,
           9000,
           10000,
           3455,
           8990,
           9000,
           10000,
           3455,
           8990,
         ],
        backgroundColor: 'rgba(52, 152, 219, 0.6)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 1
    }, {
        label: 'Expenses',
        data: [
            3000,
            4000,
            3500,
            4500,
            4200,
            5000,
            7000,
            8000,
            9000,
            10000,
            3455,
            8990,],
        backgroundColor: 'rgba(231, 76, 60, 0.6)',
        borderColor: 'rgba(231, 76, 60, 1)',
        borderWidth: 1
    }]
};

// Configuration for the Income vs Expenses Chart
const incomeExpensesConfig = {
    type: 'bar',
    data: incomeExpensesData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Data for the Net Worth Over Time Chart
const netWorthData = {
    labels: ['January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'july',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    datasets: [{
        label: 'Net Worth',
        data: [
            10000,
            20000,
            25000,
            30000,
            40000,
            50000,
            7000,
            8000,
            9000,
            10000,
            3455,
            8990],
        fill: false,
        borderColor: 'rgba(46, 204, 113, 1)',
        tension: 0.1
    }]
};

// Configuration for the Net Worth Over Time Chart
const netWorthConfig = {
    type: 'line',
    data: netWorthData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Create the charts
const incomeExpensesChart = new Chart(
    document.getElementById('incomeExpensesChart'),
    incomeExpensesConfig
);

const netWorthChart = new Chart(
    document.getElementById('netWorthChart'),
    netWorthConfig
);