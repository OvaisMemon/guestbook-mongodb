const mongoose = require("mongoose");
const schema = mongoose.Schema;

var guestSchema = new schema({   
    title:
    {
        type: String,
        required: true
    },
    message:
    {
        type: String,
        required: false
    },
    published:
    {
        type: Date,
        required: true,
        default: Date.now()
    }
});

mongoose.model("guests", guestSchema);