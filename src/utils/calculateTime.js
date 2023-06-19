import _ from "lodash"
import moment from "moment"

export const getTime = (time) => {

    let date = moment(time).toArray()
    const fromNow = moment(date).fromNow()

    const now = moment()
    const pastSeconds = now.diff(date, 'seconds')
    const pastMinutes = now.diff(date, 'minute')
    const pastHours = now.diff(date, 'hour')
    const pastDays = now.diff(date, 'day')
    const pastMonths = now.diff(date, 'month')
    const pastYears = now.diff(date, 'year')
    if (pastSeconds < 60) return pastSeconds + " seconds ago"
    else if (pastSeconds > 60 && pastMinutes < 60) return pastMinutes + " minutes ago"
    else if (pastMinutes > 60 && pastHours < 24) return pastHours + " hours ago"
    else if (pastHours > 24 && pastDays < 30) return pastDays + " days ago"
    else if (pastDays > 30 && pastMonths < 12) return pastMonths + " months ago"
    else if (pastMonths > 12) return pastYears + " years ago"

    return fromNow
}

export const joinedWhen = (time) => {
    let date = moment(time).toArray()
    const month = moment(date).format("MMMM")
    const year = moment(date).format("YYYY")

    return month + " " + year
}




export const postedWhen = (time) => {
    let date = moment(time).toArray()
    const month = moment(date).format("MMMM")
    const year = moment(date).format("YYYY")

    const result = date[3] + ":" + date[4] + " . " + month + " " + date[2] + ", " + year

    return result
}
