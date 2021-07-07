const path =require('path');
module.exports = function (options, webpack) {
  return {
    ...options,
    resolve:{
      alias:{
        "@enums":path.resolve(__dirname,'/src/common/enums')
      }
    }
  };
};