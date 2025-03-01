// Your code here
function createEmployeeRecord(array){
    return {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : [], 
    }
}
let employee = createEmployeeRecord(['jhon','smith','engineer', 22])
console.log(employee)

function createEmployeeRecords(array){
    return array.map(createEmployeeRecord)
};

function createTimeInEvent(employeeRecord,dateStamp){
    let [date, hour] = dateStamp.split(" ");
    let newEvent = {
        type: "TimeIn",
        hour: parseInt(hour), 
        date: date
    };
    employeeRecord.timeInEvents.push(newEvent);

    return employeeRecord;
};

function createTimeOutEvent(employeeRecord,dateStamp){
    let [date, hour] = dateStamp.split(" ");
    let newEvent = {
        type: "TimeOut",
        hour: parseInt(hour), 
        date: date
    };
    employeeRecord.timeOutEvents.push(newEvent);

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord,dateStamp){
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === dateStamp);
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === dateStamp);
    if (!timeInEvent || !timeOutEvent) {
        return 0;
    }
    return (timeOutEvent.hour - timeInEvent.hour) / 100;

};


function wagesEarnedOnDate(employeeRecord,dateStamp){
let pay = employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord,dateStamp)
return pay;

};

function allWagesFor(employeeRecord){
    return employeeRecord.timeInEvents
        .map(event => event.date) 
        .reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
}

function calculatePayroll(employeeRecords){
   return employeeRecords.reduce((total, employee)=> total + allWagesFor(employee),0)
    
}