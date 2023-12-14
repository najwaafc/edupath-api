const communities = require('./community');
const { nanoid } = require('nanoid');

// menambahkan komunitas
const addCommunity = (request, h) => {
  const {
    name,
    location,
    description,
    members,
    status,
    type
  } = request.payload;

  // Validasi data yang diterima
  if (!name || !location || !description || members === undefined) {
    return h.response({ status: 'fail', message: 'Gagal menambahkan komunitas. Mohon isi data dengan lengkap' }).code(400);
  }

  const id = nanoid();

  const newCommunity = {
    id,
    name,
    location,
    description,
    members,
    status,
    type
  };

  communities.push(newCommunity);
  return h.response({ status: 'success', message: 'Komunitas berhasil ditambahkan', data: { communityId: id } }).code(201);
};

//getAll
const getAllCommunityHandler = () => {
  return {
    status: 'success',
    data: {
      communities: communities.map((community) => ({
      id: community.id,
      name: community.name,
      location: community.location,
      members: community.members,
      status: community.status,
      type: community.type
      })),
    }
  };
  };

  //menampilkan detail
  const getCommunityByIdHandler = (request, h) => {
    const { id } = request.params;
  
    // Cari buku berdasarkan bookId
    const community = communities.find((c) => c.id === id);
  
    if (!community) {
      return h.response({ status: 'fail', message: 'Komunitas tidak ditemukan' }).code(404);
    }
  
    return {
      status: 'success',
      data: {
        community,
      },
    };
  };

  // //button join
  // const joinCommunity = async (communityId) => {
  //   // Validasi communityId
  //   if (!communityId) {
  //     throw new Error('Community ID tidak boleh kosong');
  //   }
  
  //   // Mendapatkan data komunitas
  //   const community = communities.find((c) => c.id === communityId);
  
  //   // Validasi komunitas
  //   if (!community) {
  //     throw new Error('Komunitas tidak ditemukan');
  //   }
  
  //   // Menambah jumlah member komunitas
  //   community.members++;
  
  //   // Menyimpan data komunitas yang baru
  //   communities[communityId] = community;
  
  //   // Mengembalikan response
  //   const response = {
  //     message: 'Berhasil bergabung ke komunitas',
  //   };
  
  //   return response;
  // };
  //search community
const searchCommunities = async (req, h) => {
  // Mendapatkan parameter pencarian dari request
  const keyword = req.query.keyword;

  // Check if keyword exists
  if (!keyword) {
    return h.response({ results: [] }).code(200);
  }

  // Convert keyword to lowercase
  keyword = keyword.toLowerCase();

  // Mencari community berdasarkan keyword
  const communitiesFound = communities.filter((c) =>
    c.name.toLowerCase().includes(keyword)
  );

  return {
    status: 'success',
    data: {
      community,
    },
  }.code(200);
};

module.exports = { addCommunity, getAllCommunityHandler, getCommunityByIdHandler, searchCommunities };
  
