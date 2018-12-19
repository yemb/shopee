
const changeMonth = (month)=>{
    switch(month) {
        case 0:
            return 'Jan'
        case 1:
            return 'Feb'
        case 2:
            return 'Mar'
        case 3:
            return 'Apr'
        case 4:
            return 'May'
        case 5:
            return 'June'
        case 6:
            return 'July'
        case 7:
            return 'Aug'
        case 8:
            return 'Sept'
        case 9:
            return 'Oct'
        case 10:
            return 'Nov'
        case 11:
            return 'Dec'
    }
}

const detail = (time,changMonth) => {
    const date = new Date(time)
    const day = String(date.getDate())
    let month
    if(changMonth) {
        month = changeMonth(date.getMonth())
    } else {
        month = String(date.getMonth()+1)
    }
    const year = String(date.getFullYear())
    const hour = String(date.getHours())
    const minute = String(date.getMinutes())
    return {
        date, day, month, year, hour, minute
    }
}

export const searchResultTime = (rule) => {
    let now = new Date()
    let from = detail(now,false)
    let to
    now = now.getTime()
    if(rule === 'TODAY') {
        to = now + 1000*60*60*24
    }
    if(rule === 'TOMORROW') {
        to = now+1000*60*60*24*2
    }
    if(rule === 'THIS WEEK') {
        to = now+1000*60*60*24*7
    }
    if(rule === 'THIS MOUTH') {
        to = now+1000*60*60*24*30
    }
    if(rule === 'LATER') {
        now = now+1000*60*60*24*30,
        to = 'later'
    }
    if(!rule) {
        return {
            from: `${from.day}/${from.month}`
        }
    }

    if(from.month.length===1) {
        from.month = `0${from.month}`
    }
    if(from.day.length===1) {
        from.day = `0${from.day}`
    }

    if(typeof to === 'number') {
        to = detail((new Date()).setTime(to),false)
        if(to.month.length===1) {
            to.month = `0${to.month}`
        }
        if(to.day.length===1) {
            to.day = `0${to.day}`
        }
        return {
            from: `${from.day}/${from.month}`,
            to: `${to.day}/${to.month}`
        }
    } else {
        return {
            from: `${from.day}/${from.month}`,
            to
        }
    }
}
// console.log(searchResultTime('LATER'))

export const listTime = (prev) => {
    const { date,day, month, year, hour, minute } = detail(prev, true)
    const result = `${day} ${month} ${year} ${hour}:${minute}`
    return result
}

export const searchTime = (rule) => {
    let now = new Date()
    now = now.getTime()
    if(rule === 'TODAY') {
        now += 1000 * 60 * 60 * 24
        // now = new Date(now)
        return now
    }
    if(rule === 'TOMORROW') {
        now += 1000 * 60 * 60 * 24 * 2
        // now = (new Date()).setTime(now)
        return now
    }
    if(rule === 'THIS WEEK') {
        now += 1000 * 60 * 60 * 24 * 7
        // now = new Date(now)
        return now
    }
    if(rule === 'THIS MOUTH') {
        now += 1000 * 60 * 60 * 24 * 30
        // now = new Date(now)
        return now
    }
    if(rule === 'LATER') {
        now += 1000 * 60 * 60 * 24 * 30
        // now = new Date(now)
        return now
    }
}

// export const searchTime = (rule, beginTime) => {
//     const begin = new Date(beginTime)
//     const now = new Date()

//     if(rule === 'TODAY' && begin-now < 1000*60*60*24) {
//         return true
//     }
//     if(rule === 'ANY TIME') {
//         return true
//     }
//     if(rule === 'TOMORROW' && begin - now < 1000*60*60*24*2) {
//         return true
//     }
//     if(rule === 'THIS WEEK' && begin - now < 1000*60*60*24*7) {
//         return true
//     }
//     if(rule === 'THIS MOUTH' && begin - now < 1000*60*60*24*30) {
//         return true
//     }
//     if(rule === 'LATER' && begin- now > 1000*60*60*24*30) {
//         return true
//     }
//     return false
// }

export const commentTime = (time) => {
    const now = new Date()
    const prev = new Date(time)
    let month = Math.floor((now-prev)/(1000*60*60*24*30))
    let week = Math.floor((now-prev)/(1000*60*60*24*7))
    let day = Math.floor((now-prev)/(1000*60*60*24))
    let hour = Math.floor((now-prev)/(1000*60*60))
    let minute  = Math.floor((now-prev)/(1000*60))
    if(month) {
        return `${month} months ago`
    }
    if(week) {
        return `${week} weeks ago`
    }
    if(day) {
        return `${day} days ago`
    }
    if(hour) {
        return `${hour} hours ago`
    }
    if(minute) {
        if(minute>5) {
            return `${minute} minutes ago`
        } else {
            return `within 5 minutes`
        }
    }
}

// let now = new Date()
// console.log(now)

// now = now.getTime()

// console.log(now)

// now += 1000 * 60*60*24
// console.log(now)
// now = (new Date()).setTime(now)
// console.log(now)