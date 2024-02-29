var router = async function(){
    const route = '/api/v1';
    const route_path = appDir + '/controllers/api/v1';

    app.use(route+'/kegiatanKomunitas', require(route_path+'/kegiatanKomunitas/route'));
    app.use(route+'/berita', require(route_path+'/berita/route'));
    app.use(route+'/memberKomunitas', require(route_path+'/memberKomunitas/route'));
    app.use(route+'/aturanBlog', require(route_path+'/aturanBlog/route'));
    app.use(route+'/profilKomunitas', require(route_path+'/profilKomunitas/route'));

    app.use(route+'/admin', require(route_path+'/admin/route'));
  }
  
  module.exports = router;