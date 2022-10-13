function sorting(sortingType) {
  switch (sortingType) {
    case '1':
      return { name: 'asc' }
    case '2':
      return { name: 'desc' }
    case '3':
      return { category: 'asc' }
    case '4': 
      return { location: 'asc'} 
  }
}

module.exports = sorting