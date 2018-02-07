var filters={
    money:(value) => {
        return isNaN(value)?'':Math.round(value * 100) / 100
    },
    moneyFixed:(value) => {
        return isNaN(value)?'':(Math.round(value * 100) / 100).toFixed(2)
    }
}

export default filters;