const { produceMessage } = require("../utils/producer");
const axios = require('axios');

const SendPushNotification = async (msg) => {
  try{ 
    console.log("trying to send push notification");
    console.log(msg);
    data = {
      _id : msg._id,
      user_id: msg.user_id,
      message: msg.message
    }

    await axios.post(`http://20.244.93.34:3000/sendNotification`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // console.log(`Notification sent to user ${user_id}: ${message}`);

  }catch(err){
     try {
      console.error("Error Sending Push Notification:", err.message);
          await produceMessage("Replay-Failed-Notification", msg);
        } catch (err) {
          console.error(
            "Error Sending Payload To Push-Notification Queue",
            err
          );
        }

  }
    console.log("msg: " + msg.message);
  };
  
module.exports = { SendPushNotification };