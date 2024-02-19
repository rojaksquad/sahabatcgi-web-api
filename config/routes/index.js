var router = async function(){
    const route = '/api/v1';
    const route_path = appDir + '/controllers/api/v1';

    app.use(route+'/kegiatanKomunitas', require(route_path+'/kegiatanKomunitas/route'));
    app.use(route+'/berita', require(route_path+'/berita/route'));
  
  }
  
  module.exports = router;