const axios = require('axios');

const sent =  (model) =>{
    const res =  axios.get(`https://api.telegram.org/bot${model.token}/sendMessage`,
     { params : {chat_id: model.chat_id, text:model.text }});
    return res;
}
  module.exports = {
    sent
  }