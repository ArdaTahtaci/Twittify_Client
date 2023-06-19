export const checkData = (data) => {


    let dataArray = []

    if (data.profileBackgroundPhoto != null) dataArray.push(data.profileBackgroundPhoto)
    else dataArray.push(undefined)
    if (data.profilePhoto != null) dataArray.push(data.profilePhoto)
    else dataArray.push(undefined)
    if (data.name !== "") dataArray.push(data.name)
    else dataArray.push(undefined)
    if (data.bio !== "") dataArray.push(data.bio)
    else dataArray.push(undefined)

    return dataArray

}