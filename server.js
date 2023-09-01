require('dotenv').config();
const cors = require('cors');
const OrdersDB = require('./modules/OrdersDB');
const express = require("express");
const app = express();

const db = new OrdersDB();


const HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.post('/api/orders', (req,res)=>{
    db.addNewOrder(req.body).then(db=>{
        console.log(db);
        res.status(201).json(db);
    }).catch(err=>{
        res.status(404).json({message: err})
    });
});

app.get('/api/orders', (req,res)=>{
    db.getAllOrders().then(db=>{
        res.json(db);
    }).catch(err=>{
        res.status(500).json({message: err.message})
    });
});

app.get('/api/orders/:id', (req, res)=>{
    db.getOrderById(+req.params.id).then(result=>{
        console.log(`The result from the route is: ${result}`);
        console.log(typeof(result));
        res.json(result);
    }).catch(err=>{
        res.status(404).json({message: err})
    });
})

app.delete('/api/orders/:id', (req,res)=>{
    //console.log(`INISDE DELETE ROUTE ID: ${req.params.id}`);
    db.deleteOrderById(req.params.id).then(result=>{
       res.status(201);
    }).catch(err=>{
        res.status(404).json({message: err})
    });
})

app.put('/api/orders', (req,res)=>{
    db.updateOrderById(req.body, req.body.id).then(result=>{
        console.log(`The updated order id is ${result.id}`);
        res.json(result);
    }).catch(err=>{
        res.status(404).json({message: err})
    });
})


app.post('/api/scooters', (req,res)=>{
    db.addNewScooter(req.body).then(db=>{
        console.log(db);
        res.status(201).json(db);
    }).catch(err=>{
        res.status(404).json({message: err})
    });
});

app.get('/api/scooters', (req,res)=>{
    db.getAllScooters().then(db=>{
        res.json(db);
    }).catch(err=>{
        res.status(500).json({message: err.message})
    });
});

app.get('/api/scooters/:id', (req, res)=>{
    db.getOrderById(+req.params.id).then(result=>{
        console.log(`The result from the route is: ${result}`);
        console.log(typeof(result));
        res.json(result);
    }).catch(err=>{
        res.status(404).json({message: err})
    });
})

app.delete('/api/scooters/:id', (req,res)=>{
    //console.log(`INISDE DELETE ROUTE ID: ${req.params.id}`);
    db.deleteScooterById(req.params.id).then(result=>{
       res.status(201);
    }).catch(err=>{
        res.status(404).json({message: err})
    });
})

app.put('/api/scooters', (req,res)=>{
    db.updateScooterById(req.body, req.body.id).then(result=>{
        console.log(`The updated scooter id is ${result.id}`);
        res.json(result);
    }).catch(err=>{
        res.status(404).json({message: err})
    });
})


app.get('/', (req, res)=>{
    res.json({message: "API listening"});
})

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
})

