import axios from "axios";
import config from "../config";

const sendSMS = async (message: string, mobile: string, sender = "") => {
    return await axios.post("", {}, { headers: {} });

    // return await axios({
    //     url: "hhttps://d7sms.p.rapidapi.com/messages/v1/send",
    //     method: "post",
    //     headers: {
    //         Accept: "application/json",
    //     },
    //     data: {
    //         api_token: config.mail.bulkSMSToken,
    //         from: sender,
    //         to: mobile,
    //         body: message,
    //     },
    // });
};

export default sendSMS;
