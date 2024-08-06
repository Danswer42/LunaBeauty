const options = {
  page: 1,
  limit: 10,
  collation: {
    locale: 'es'
  },
  sort: {
    name: 1
  },
  select: { 
    name: 1, // Seleccionamos solo name
    _id: 1
  } 
};

module.exports = options;