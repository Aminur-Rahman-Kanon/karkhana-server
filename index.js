const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './public/views');
app.set('view engine', 'ejs');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const productsRoute = require('./routes/products');
const forgotPassword = require('./routes/forgotPassword');
const resetPassword = require('./routes/resetPassword');
const confirmResetPassword = require('./routes/confirmResetPassword');
const getBlog = require('./routes/blog');
const updateProfile = require('./routes/updateProfile');
const updateRedirect = require('./routes/updateRedirect');


//routes
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/products/:productId', productsRoute);
app.use('/forgot-password', forgotPassword);
app.use('/reset-password/:id/:token', resetPassword);
app.use('/reset-password/:id/:token', confirmResetPassword);
app.use('/get-blogs', getBlog);

//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`des ${file}`);
        cb(null, 'public/assets/users');
    },
    filename: (req, file, cb) => {
        console.log(req.body);
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024
}});

app.use('/update-profile', updateProfile);
app.use('/redirect-user', updateRedirect);


app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => console.log('database connected')).catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))

    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    // })
}

// const t = [
//     {category: 'others', rating: 2, name: 'Other 1', img: 'https://karkhana-server.onrender.com/assets/products/others/other1.jpg', price: '1200', quantity: 10, details: 'Laboris veniam mollit irure ut do pariatur excepteur.'}
//     ,
//     {category: 'others', rating: 4, name: 'Other 2', img: 'https://karkhana-server.onrender.com/assets/products/others/other2.jpg', price: '1300', quantity: 5, details: 'Non do enim laborum veniam tempor dolor aliquip eiusmod nulla pariatur aliquip duis veniam.'}
//     , 
//     {category: 'others', rating: 5, name: 'Other 3', img: 'https://karkhana-server.onrender.com/assets/products/others/other3.jpg', price: '1400', quantity: 6, details: 'Lorem amet sint proident laborum.'}
//     ,
//     {category: 'others', rating: 3, name: 'Other 4', img: 'https://karkhana-server.onrender.com/assets/products/others/other4.jpg', price: '1000', quantity: 7, details: 'Ipsum eu ad laboris consectetur reprehenderit dolore Lorem id aute anim aliqua Lorem cupidatat.'}
//     , 
//     {category: 'others', rating: 4, name: 'Other 5', img: 'https://karkhana-server.onrender.com/assets/products/others/other5.jpg', price: '1700', quantity: 8, details: 'Culpa aute ea exercitation quis fugiat nisi commodo adipisicing nisi irure.'}
//     , 
//     {category: 'others', rating: 5, name: 'Other 6', img: 'https://karkhana-server.onrender.com/assets/products/others/other6.jpg', price: '1100', quantity: 9, details: 'Culpa quis nisi mollit est ullamco aute.'}
//     , 
//     {category: 'others', rating: 3, name: 'Other 7', img: 'https://karkhana-server.onrender.com/assets/products/others/other7.jpg', price: '1500', quantity: 8, details: 'Ut adipisicing qui fugiat veniam.'}
//     ,
//     {category: 'others', rating: 3, name: 'Other 8', img: 'https://karkhana-server.onrender.com/assets/products/others/other8.jpg', price: '1300', quantity: 2, details: 'Anim sint laborum sit anim enim et pariatur laboris ut aliqua cupidatat do proident pariatur.'}
//     , 
//     {category: 'others', rating: 3, name: 'Other 9', img: 'https://karkhana-server.onrender.com/assets/products/others/other9.jpg', price: '1100', quantity: 1, details: 'Veniam id qui dolore in eiusmod aliqua exercitation aliqua laboris fugiat ea consequat.'}
//     , 
//     {category: 'others', rating: 1, name: 'Other 10', img: 'https://karkhana-server.onrender.com/assets/products/others/other10.jpg', price: '1200', quantity: 12, details: 'Et cupidatat proident velit ut sunt cupidatat fugiat ea cillum labore irure.'}
// ]

// const blog = [
//     {title: 'Veniam proident aliquip ipsum ut mollit est adipisicing consequat.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog1.jpg',
//      date: '10/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Sunt officia officia magna excepteur ad reprehenderit occaecat molsa.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog2.jpg',
//      date: '13/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Aliquip consectetur exercitation laboris occaecat exercitation tempor.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog3.jpg',
//      date: '14/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Eiusmod consequat Lorem eu veniam reprehenderit.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog4.jpg',
//      date: '15/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Aute minim ad magna magna anim ad cupidatat commodo labore id sit sunt irure nisi.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog5.jpg',
//      date: '17/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Consequat eu ullamco amet ex consectetur voluptate.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog6.jpg',
//      date: '18/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Non voluptate Lorem sit excepteur.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog7.jpg',
//      date: '19/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Reprehenderit labore laboris culpa tempor excepteur laboris pariatur aliqua.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog8.jpg',
//      date: '20/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Deserunt elit est velit ad consectetur.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog9.jpg',
//      date: '22/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Fugiat Lorem reprehenderit proident voluptate esse nisi cillum ex.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog10.jpg',
//      date: '23/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Magna nulla est laboris irure tempor ad proident ex qui in adipisicing quis est veniam.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog11.jpg',
//      date: '25/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Anim aute proident sint laborum proident cillum non Lorem ex dolor enim tempor esse.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog12.jpg',
//      date: '26/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Culpa pariatur elit amet exercitation non labore sit ea proident.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog13.jpg',
//      date: '28/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Lorem veniam incididunt ullamco enim cillum anim esse ullamco cupidatat enim.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog14.jpg',
//      date: '1/03/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Laboris officia ea eu qui ut sunt dolore incididunt aute amet quis do ex consectetur.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog15.jpg',
//      date: '3/03/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Nisi cupidatat eu officia labore laboris fugiat exercitation.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog16.jpg',
//      date: '5/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Labore culpa consectetur et id aute eu esse.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog17.jpg',
//      date: '7/03/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Cupidatat ad sit adipisicing magna duis duis.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog18.jpg',
//      date: '9/03/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Do minim ex voluptate deserunt.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog19.jpg',
//      date: '10/03/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Mollit excepteur adipisicing veniam sunt consectetur est aliquip incididunt dolor incididunt nulla exercitation.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog20.jpg',
//      date: '15/04/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
// ]

// blog.map(async item => {
//     await blogModel.create({
//         title: item.title,
//         img: item.img,
//         date: item.date,
//         details: item.details
//     })
// })

// t.map(async item => {
//     return await exclusiveModel.create({
//         category: item.category,
//         rating: item.rating,
//         name: item.name,
//         img: item.img,
//         price: item.price,
//         quantity: item.quantity,
//         details: item.details
//     })
// })

const port = process.env.PORT

app.listen(port || '8000', (err) => {
    if (!err){
        console.log('server running on 8000')
    }
    else console.log(err);
})

module.exports = upload;