const { addCommunity, 
    getAllCommunityHandler,
    getCommunityByIdHandler,
    searchCommunities
  } = require('./handler');

const routes = [
    {
      method: 'POST',
      path: '/community',
      handler: addCommunity,
    },
    {
      method: 'GET',
      path: '/community',
      handler: getAllCommunityHandler,
    },
    {
      method: 'GET',
      path: '/community/{id}',
      handler: getCommunityByIdHandler,
    },
    {
      method: 'GET',
      path: '/community/search',
      handler: searchCommunities,
    },
  ];
  
  module.exports = routes;
