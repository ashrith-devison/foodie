const { model, Schema } =  require('mongoose');

const UserSchema = new Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String,
         required: true,
          unique: true 
    },
    password: { 
        type: String, 
        required: true
    },
    address: { 
        type: String, 
        required: true 
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    isBlocked: { 
        type: Boolean, 
        default: false 
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

module.exports= model('users', UserSchema);