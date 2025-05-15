const transformRepositoryUnits = (unitList) =>
  unitList
    ? unitList.map((current, index) => ({
        ...current,
        person_family_name: current.person_family_name
          ? current.person_family_name.substring(
              0,
              Math.min(2, current.person_family_name.length)
            ) + '*****'
          : '*****',
        person_given_name: current.person_given_name
          ? current.person_given_name.substring(
              0,
              Math.min(2, current.person_given_name.length)
            ) + '*****'
          : '*****',
        organisation_name: current.organisation_name
          ? current.organisation_name.substring(
              0,
              Math.min(2, current.organisation_name.length)
            ) + '*****'
          : '*****'
      }))
    : undefined

export { transformRepositoryUnits }
