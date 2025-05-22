const transformRepositoryWorkschedule = (workscheduleList) =>
  workscheduleList
    ? workscheduleList.map((current, index) => ({
        ...current,
        contactid: current.contactid
          ? current.contactid.substring(
              0,
              Math.min(2, current.contactid.length)
            ) + '*****'
          : '*****',
        locationid: current.locationid
          ? current.locationid.substring(
              0,
              Math.min(2, current.locationid.length)
            ) + '*****'
          : '*****',
        contactname: current.contactname
          ? current.contactname.substring(
              0,
              Math.min(2, current.contactname.length)
            ) + '*****'
          : '*****'
      }))
    : undefined

export { transformRepositoryWorkschedule }
