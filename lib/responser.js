const success = async (res, message = 'success', result = {}, code = null) => {
    try {
        res.status(200).json({
            code: code,
            status: 'success',
            message: message,
            result: result,
        });       
    } catch (error) {
        log.error(error);
    }
  };
  
  const error = async (res, message = 'error', result = {}, code = null) => {
    try {
        res.status(200).json({
          code: code,
          status: 'error',
          message: message,
          result: result,
        });
    } catch (error) {
      log.error(error);
    }
  };
  
  module.exports = {
    success,
    error,
  };
  