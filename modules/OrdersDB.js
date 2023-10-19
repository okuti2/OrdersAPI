const mongoose = require("mongoose");


const OrderSchema = mongoose.Schema({
    id: Number,
    title: String, // Event title
    start: Date, // Event start date
    end: Date, // Event end date
    allDay: Boolean, // Whether the event is an all-day event
    color: Object, // Event color
    actions: Object,
    costPrice: Number,
    salePrice: Number,
    Profit: Number,
    saleDate: String, 

    // Other event properties specific to your application
}, { collection: 'Order' });

const ScooterSchema = mongoose.Schema({
    id: Number,
    model: String,
    costPrice: Number,
    // Other event properties specific to your application
}, { collection: 'Scooter' });

module.exports = class OrdersDB{
    constructor(){
        this.Order = null;
        this.Scooter = null;
    }

    initialize(connectionString){
        return new Promise((resolve, reject) =>{
            const db = mongoose.createConnection(
                connectionString,
                {
                    useNewUrlParser: true,
                }
            );

            db.once('error', (err) =>{
                reject(err);
            });
            db.once('open', ()=>{
                this.Order = db.model('Order', OrderSchema);
                this.Scooter = db.model('Scooter', ScooterSchema)
                console.log(`opened from ${connectionString}`);
                console.log(this.Order );
                console.log(this.Scooter);
                resolve();
            });
        });
    }


    async addNewOrder(data){
        if(data.saleDate){
            data.start = new Date(data.saleDate);
            data.end = new Date(data.saleDate);
        }
        data.Profit = data.salePrice - data.costPrice;
        const newOrder = new this.Order(data);
        await newOrder.save();
        console.log(newOrder);
        return newOrder;
    }

    getAllOrders(){
        return this.Order.find().exec();
    }

    updateOrderById(data, id){
        return this.Order.updateOne({id: id}, {$set: data}).exec();
    }

    deleteOrderById(id){
        return this.Order.deleteOne({id: id}).exec();
    }

    async addNewScooter(data){
        const newScooter = new this.Scooter(data);
        await newScooter.save();
        console.log(newScooter);
        return newScooter;
    }

    getAllScooters(){
        return this.Scooter.find().exec();
    }

    updateScooterById(data, id){
        return this.Scooter.updateOne({id: id}, {$set: data}).exec();
    }

    deleteScooterById(id){
        return this.Scooter.deleteOne({id: id}).exec();
    }
}