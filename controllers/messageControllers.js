
const Message = require('../models/Message');

const addMessage = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const messageContent = req.body.message;
    const message = new Message({
        name: name,
        email: email,
        message: messageContent
    })
    try {
        await message.save();
    } catch (err) {
        console.log(err);
    }
    res.status(201).json({message: "Message sent!!"});
}

exports.addMessage = addMessage;