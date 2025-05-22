const transformRepositoryWorkschedule = (workscheduleList) =>
  workscheduleList
    ? workscheduleList.map((current, index) => ({
        ...current,
        contactId: current.contactId
          ? current.contactId.substring(
              0,
              Math.min(2, current.contactId.length)
            ) + '*****'
          : '*****',
        locationId: current.locationId
          ? current.locationId.substring(
              0,
              Math.min(2, current.locationId.length)
            ) + '*****'
          : '*****',
        locationContactName: current.locationContactName
          ? current.locationContactName.substring(
              0,
              Math.min(2, current.locationContactName.length)
            ) + '*****'
          : '*****'
      }))
    : undefined

export { transformRepositoryWorkschedule }
