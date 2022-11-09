function createEmployeeRecord(info) {
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(info) {
    const newArray = [];
    for (const array of info) {
        newArray.push(createEmployeeRecord(array));
    }
    return newArray;
}

function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(e => e.date === date);
    let timeOut = employee.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    return employee.payPerHour * hoursWorkedOnDate(employee, date);
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, current) => total + wagesEarnedOnDate(employee, current.date), 0);
}

function calculatePayroll(employees) {
    return employees.reduce((total, current) => total + allWagesFor(current), 0);
}