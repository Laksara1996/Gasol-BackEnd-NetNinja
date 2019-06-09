const graphql = require('graphql');
const _ = require('lodash');

//Imports
const Stock = require('../models/Stock');
const Author = require('../models/Author');
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const CreditCustomer = require('../models/CreditCustomer');
const CreditFuelSale = require('../models/CreditFuelSale');
const CreditOtherSale = require('../models/CreditOtherSale');
const FuelType = require('../models/FuelType');
const CreditPayment = require('../models/CreditPayment');
const Tank = require('../models/Tank');
const TankRecord = require('../models/TankRecord');
const Pump = require('../models/Pump');
const MeterReading = require('../models/MeterReading');
const Vehicle = require('../models/Vehicle');

const {
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLInputObjectType,
} = graphql;


const StockType = new GraphQLObjectType({
    name: 'Stock',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        productId: { type: new GraphQLNonNull(GraphQLID) },
        quntity: { type: new GraphQLNonNull(GraphQLFloat) },
        availableQuntity: { type: new GraphQLNonNull(GraphQLFloat) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        commission: { type: new GraphQLNonNull(GraphQLFloat) },
        date: { type: new GraphQLNonNull(GraphQLString) },
    })
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        units: { type: new GraphQLNonNull(GraphQLString) },
        stock: {
            type: new GraphQLNonNull(GraphQLList(StockType)),
            resolve(parent, args) {
                return Stock.find({ productId: parent.id });
            }
        }
    })
});

const SaleType = new GraphQLObjectType({
    name: 'Sale',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        quntity: { type: new GraphQLNonNull(GraphQLFloat) },
        total: { type: new GraphQLNonNull(GraphQLFloat) },
        profit: { type: new GraphQLNonNull(GraphQLFloat) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        stock: {
            type: new GraphQLNonNull(StockType),
            resolve(parent, args) {
                return Stock.find({});
            }
        }
    })
});

const CreditCustomerType = new GraphQLObjectType({
    name: 'CreditCustomer',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLString },
        phoneNo: { type: GraphQLString },
        creditLimit: { type: new GraphQLNonNull(GraphQLFloat) },
        currentCredit: { type: new GraphQLNonNull(GraphQLFloat) },
        vehicles: {
            type: new GraphQLNonNull(GraphQLList(VehicleType)),
            resolve(parent, args) {
                return Vehicle.find({});
            }
        }
    })
});
const VehicleType = new GraphQLObjectType({
    name: 'Vehicle',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        creditCustomerId: { type: new GraphQLNonNull(GraphQLID) },
        registerdNo: { type: new GraphQLNonNull(GraphQLString) },
        fuelType: {
            type: new GraphQLNonNull(FuelTypeType),
            resolve(parent, args) {
                return FuelType.find({});
            }
        }
    })
});

const FuelTypeType = new GraphQLObjectType({
    name: 'FuelType',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        priceList: {
            type: new GraphQLNonNull(new GraphQLList(PriceListType))
        },

    })
});

const PriceListType = new GraphQLObjectType({
    name: 'PriceList',
    fields: () => ({
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        commission: { type: new GraphQLNonNull(GraphQLFloat) },
        date: { type: new GraphQLNonNull(GraphQLString) },
    })
});

const PriceListInputType = new GraphQLInputObjectType({
    name: 'PriceListInput',
    fields: () => ({
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        commission: { type: new GraphQLNonNull(GraphQLFloat) },
        date: { type: new GraphQLNonNull(GraphQLString) },
    })
});

const CreditOtherSaleType = new GraphQLObjectType({
    name: 'CreditOtherSale',
    fields: () => ({
        creditCustomerId: { type: new GraphQLNonNull(GraphQLID) },
        orderNo: { type: GraphQLString },
        total: { type: new GraphQLNonNull(GraphQLFloat) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        itemList: {
            type: new GraphQLNonNull(new GraphQLList(ItemListType))
        }
    })
});

const ItemListType = new GraphQLObjectType({
    name: 'ItemList',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        stockId: { type: new GraphQLNonNull(GraphQLID) },
        quntity: { type: new GraphQLNonNull(GraphQLFloat) },
        pricePerUnit: { type: new GraphQLNonNull(GraphQLFloat) },

    })
});

const ItemListInputType = new GraphQLInputObjectType({
    name: 'ItemListInput',
    fields: () => ({
        stockId: { type: new GraphQLNonNull(GraphQLID) },
        quntity: { type: new GraphQLNonNull(GraphQLFloat) },
        pricePerUnit: { type: new GraphQLNonNull(GraphQLFloat) },

    })
});

const CreditFuelSaleType = new GraphQLObjectType({
    name: 'CreditFuelSale',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        creditCustomerId: { type: new GraphQLNonNull(GraphQLID) },
        vehicleId: { type: new GraphQLNonNull(GraphQLID) },
        orderNo: { type: GraphQLString },
        invoiceNo: { type: new GraphQLNonNull(GraphQLString) },
        fuelType: {
            type: new GraphQLNonNull(FuelTypeType),
            resolve(parent, args) {
                return FuelType.find({});
            }
        },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
        totalPrice: { type: new GraphQLNonNull(GraphQLFloat) },
        date: { type: new GraphQLNonNull(GraphQLString) },
    })
});

const CreditPaymentType = new GraphQLObjectType({
    name: 'CreditPayment',
    fields: () => ({
        creditCustomerId: { type: new GraphQLNonNull(GraphQLID) },
        paidAmount: { type: new GraphQLNonNull(GraphQLFloat) },
        paymentType: { type: new GraphQLNonNull(GraphQLString) },
        chequeNo: { type: GraphQLString },
        date: { type: new GraphQLNonNull(GraphQLString) },
    })
});

const TankType = new GraphQLObjectType({
    name: 'Tank',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        fuelTypeId: { type: new GraphQLNonNull(GraphQLID) },
        capacity: { type: new GraphQLNonNull(GraphQLFloat) },
        availableAmount: { type: new GraphQLNonNull(GraphQLFloat) },
        reservoir: { type: new GraphQLNonNull(GraphQLFloat) },
    })
});

const TankRecordType = new GraphQLObjectType({
    name: 'TankRecord',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        tankId: { type: new GraphQLNonNull(GraphQLID) },
        recordType: { type: new GraphQLNonNull(GraphQLString) },
        inhandBalance: { type: new GraphQLNonNull(GraphQLFloat) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
        expectedBalance: { type: new GraphQLNonNull(GraphQLFloat) },
        realBalance: { type: new GraphQLNonNull(GraphQLFloat) },
        pricePerUnit: { type: new GraphQLNonNull(GraphQLFloat) },
        commission: { type: new GraphQLNonNull(GraphQLFloat) },
        date: { type: new GraphQLNonNull(GraphQLString) },
    })
});

const PumpType = new GraphQLObjectType({
    name: 'Pump',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        tankId: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
    })
});

const MeterReadingType = new GraphQLObjectType({
    name: 'MeterReading',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        pumpId: { type: new GraphQLNonNull(GraphQLID) },
        reading: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
    })
});

const saleDetails = new GraphQLObjectType({
    name: 'saleDetails',
    fields: () => ({
        totalSaleIncome: { type: GraphQLFloat },
        totalItemSold: { type: GraphQLFloat },
        totalCommission: { type: GraphQLFloat },
    })
})

const DailyLubricantSaleType = new GraphQLObjectType({
    name: 'DailyLubricantSale',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        units: { type: new GraphQLNonNull(GraphQLString) },
        stock: {
            type: new GraphQLNonNull(GraphQLList(StockType)),
            resolve(parent, args) {
                return Stock.find({ productId: parent.id });
            }
        },
        saleDetails: {
            type: new GraphQLNonNull(saleDetails),
            resolve(parent, args) {
                const ds = new Date(parent.date);
                ds.setHours(0,0,0,0);
                const df = new Date(parent.date);
                df.setHours(23,59,59,999);
                return Sale.
                    aggregate([
                        {
                            $match: { date: { $gte: ds,$lte: df }, productId: parent._id }
                        },
                        {
                            $group: {
                                _id: "$productId",
                                totalItemSold: {
                                    $sum: "$quntity"
                                },
                                totalCommission: {
                                    $sum: { $multiply: ["$quntity", "$commission"] }
                                },
                                totalSaleIncome: {
                                    $sum: "$total"
                                }
                            },
                        }
                    ])
                    .then(result => {
                        return result[0] ? result[0] : { totalSaleIncome: 0,totalItemSold:0,totalCommission: 0}
                    }).catch(error => {
                        throw error;
                    })

            }
        },
    })
});




/*
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        /* books:{
             type:new GraphQLList(BookType),
             resolve(parent,args){
                 return Book.find({authorId:parent.id});
             }
         }
    })
});
*/
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        stock: {
            type: new GraphQLNonNull(GraphQLList(StockType)),


            resolve(parent, args) { //Grab Data
                return Stock.find({});
            }
        },
        products: {
            type: new GraphQLNonNull(GraphQLList(ProductType)),


            resolve(parent, args) { //Grab Data
                return Product.find({});
            }
        },
        product: {
            type: new GraphQLNonNull(ProductType),
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },

            resolve(parent, args) { //Grab Data
                return Product.findById(args._id);
            }
        },
        sale: {
            type: new GraphQLNonNull(GraphQLList(SaleType)),


            resolve(parent, args) { //Grab Data
                return Sale.find({});
            }
        },
        creditCustomer: {
            type: new GraphQLNonNull(GraphQLList(CreditCustomerType)),


            resolve(parent, args) { //Grab Data
                return CreditCustomer.find({});
            }
        },
        creditFuelSale: {
            type: new GraphQLNonNull(GraphQLList(CreditFuelSaleType)),

            resolve(parent, args) { //Grab Data
                return CreditFuelSale.find({});
            }
        },
        creditOtherSale: {
            type: new GraphQLNonNull(GraphQLList(CreditOtherSaleType)),

            resolve(parent, args) { //Grab Data
                return CreditOtherSale.find({});
            }
        },
        creditPayment: {
            type: new GraphQLNonNull(GraphQLList(CreditPaymentType)),

            resolve(parent, args) { //Grab Data
                return CreditPayment.find({});
            }
        },

        fuelType: {
            type: new GraphQLNonNull(GraphQLList(FuelTypeType)),

            resolve(parent, args) { //Grab Data
                return FuelType.find({});
            }
        },
        meterReading: {
            type: new GraphQLNonNull(GraphQLList(MeterReadingType)),

            resolve(parent, args) { //Grab Data
                return MeterReading.find({});
            }
        },
        pump: {
            type: new GraphQLNonNull(GraphQLList(PumpType)),

            resolve(parent, args) { //Grab Data
                return Pump.find({});
            }
        },
        tankRecord: {
            type: new GraphQLNonNull(GraphQLList(TankRecordType)),

            resolve(parent, args) { //Grab Data
                return TankRecord.find({});
            }
        },
        tank: {
            type: new GraphQLNonNull(GraphQLList(TankType)),

            resolve(parent, args) { //Grab Data
                return Tank.find({});
            }
        },
        vehicle: {
            type: new GraphQLNonNull(GraphQLList(VehicleType)),

            resolve(parent, args) { //Grab Data
                return Vehicle.find({});
            }
        },

        dailyLubricantSale: {
            type: new GraphQLNonNull(new GraphQLList(DailyLubricantSaleType)),
            args: { date: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) { //Grab Data
                return Product.find()
                    .exec()
                    .then(result => {
                        return result.map((value, index) => {
                            return { ...value._doc, date: args.date }

                        })
                    })
                    .catch(error => { throw error })
            }
        },
        /*
         author: {
             type: AuthorType,
             args: { id: { type: GraphQLID } },
 
             resolve(parent, args) {
                 return Author.findById(args.id);
             }
         },
  
         authors: {
             type: new GraphQLList(AuthorType),
             resolve(parent, args) {
                 return Author.find({});
             }
         }*/
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        /*addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age

                });
                return author.save();
            }
        },*/
        createStock: {
            type: StockType,
            args: {

                productId: { type: new GraphQLNonNull(GraphQLID) },
                quntity: { type: new GraphQLNonNull(GraphQLFloat) },
                availableQuntity: { type: GraphQLFloat },
                price: { type: new GraphQLNonNull(GraphQLFloat) },
                commission: { type: new GraphQLNonNull(GraphQLFloat) },
                date: { type: new GraphQLNonNull(GraphQLString) },

            },
            resolve(parent, args) {
                let stock = new Stock({

                    productId: args.productId,
                    quntity: args.quntity,
                    availableQuntity: args.availableQuntity,
                    price: args.price,
                    commission: args.commission,
                    date: args.date
                });
                return stock.save();
            }
        },
        createProduct: {
            type: ProductType,
            args: {

                name: { type: new GraphQLNonNull(GraphQLString) },
                units: { type: new GraphQLNonNull(GraphQLString) },
                stock: {
                    type: new GraphQLNonNull(GraphQLList(GraphQLID)),

                }

            },
            resolve(parent, args) {
                let product = new Product({

                    name: args.name,
                    units: args.units,
                    stock: args.stock

                });
                return product.save();
            }
        },
        deleteProduct: {
            type: ProductType,
            args: {

                _id: { type: new GraphQLNonNull(GraphQLID) },


            },
            resolve(parent, args) {
                return Product.findByIdAndDelete(args._id);
            }
        },
        updateProduct: {
            type: ProductType,
            args: {

                _id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                units: { type: new GraphQLNonNull(GraphQLString) },


            },
            resolve(parent, args) {
                return Product.findOneAndUpdate({ _id: args._id }, { name: args.name, units: args.units });
            }
        },
        createSale: {
            type: SaleType,
            args: {

                stockId: { type: new GraphQLNonNull(GraphQLID) },
                quntity: { type: new GraphQLNonNull(GraphQLFloat) },
                date: { type: new GraphQLNonNull(GraphQLString) },

            },
            resolve(parent, args, context) {
                return Stock.findById(args.stockId).exec()
                    .then(result => {
                        //console.log(result);
                        return new Sale({
                            stockId: args.stockId,
                            quntity: args.quntity,
                            date: args.date,
                            productId: result.productId,
                            price: result.price,
                            commission: result.commission,
                            total: 12,
                            profit: 12,

                        }).save()
                    })
                    .then(result => result)
                    .catch(error => { throw error })

            }
        },

        createCreditCustomer: {
            type: CreditCustomerType,
            args: {


                name: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLString },
                phoneNo: { type: GraphQLString },
                creditLimit: { type: new GraphQLNonNull(GraphQLFloat) }

            },
            resolve(parent, args) {
                let creditCustomer = new CreditCustomer({
                    name: args.name,
                    address: args.address,
                    phoneNo: args.phoneNo,
                    creditLimit: args, creditLimit
                });
                return creditCustomer.save();
            }
        },

        createVehicle: {
            type: VehicleType,
            args: {

                creditCustomerId: { type: new GraphQLNonNull(GraphQLID) },
                registerdNo: { type: new GraphQLNonNull(GraphQLString) },
                fuelTypeId: { type: new GraphQLNonNull(GraphQLID) },

            },
            resolve(parent, args) {
                let vehicle = new Vehicle({

                    creditCustomerId: args.creditCustomerId,
                    registerdNo: args.registerdNo,
                    fuelTypeId: args.fuelTypeId

                });
                return vehicle.save();
            }
        },


        createCreditFuelSale: {
            type: CreditFuelSaleType,
            args: {

                vehicleId: { type: new GraphQLNonNull(GraphQLID) },
                orderNo: { type: GraphQLString },
                amount: { type: new GraphQLNonNull(GraphQLFloat) },
                date: { type: new GraphQLNonNull(GraphQLString) },

            },
            resolve(parent, args, context) {
                let creditFuelSale = new CreditFuelSale({

                    vehicleId: args.vehicleId,
                    orderNo: args.orderNo,
                    amount: args.amount,
                    creditCustomerId: null,
                    invoiceNo: "Function to generate",
                    fuelType: null,
                    total: 12,
                    date: args.date,

                });
                return creditFuelSale.save();

            }
        },

        createFuelType: {
            type: FuelTypeType,
            args: {

                name: { type: new GraphQLNonNull(GraphQLString) },
                priceList: { type: new GraphQLNonNull(GraphQLList(PriceListInputType)) },
            },
            resolve(parent, args) {
                let fuelType = new FuelType({

                    name: args.name,
                    priceList: args.priceList

                });
                return fuelType.save();
            }
        },

        createCreditOtherSale: {
            type: CreditOtherSaleType,
            args: {

                creditCustomerId: { type: new GraphQLNonNull(GraphQLID) },
                orderNo: { type: GraphQLString },
                itemList: { type: new GraphQLNonNull(GraphQLList(ItemListInputType)) },
                date: { type: new GraphQLNonNull(GraphQLString) },

            },
            resolve(parent, args, context) {
                console.log(args);
                let creditOtherSale = new CreditOtherSale({

                    creditCustomerId: args.creditCustomerId,
                    orderNo: args.orderNo,
                    itemList: args.itemList,
                    date: args.date,
                    total: 10,
                    invoiceNo: "dgergerg"
                });
                return creditOtherSale.save();

            }
        },

        createCreditPayment: {
            type: CreditPaymentType,
            args: {

                creditCustomerId: { type: new GraphQLNonNull(GraphQLID) },
                paidAmount: { type: new GraphQLNonNull(GraphQLFloat) },
                paymentType: { type: new GraphQLNonNull(GraphQLString) },
                chequeNo: { type: GraphQLString },
                date: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let creditPayment = new CreditPayment({

                    creditCustomerId: args.creditCustomerId,
                    paidAmount: args.paidAmount,
                    paymentType: args.paymentType,
                    chequeNo: args.chequeNo,
                    date: args.date

                });
                return creditPayment.save();
            }
        },

        createTank: {
            type: TankType,
            args: {

                name: { type: new GraphQLNonNull(GraphQLString) },
                fuelTypeId: { type: new GraphQLNonNull(GraphQLID) },
                capacity: { type: new GraphQLNonNull(GraphQLFloat) },
                availableAmount: { type: new GraphQLNonNull(GraphQLFloat) },
                reservoir: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args) {
                let tank = new Tank({

                    name: args.name,
                    fuelTypeId: args.fuelTypeId,
                    capacity: args.capacity,
                    availableAmount: args.availableAmount,
                    reservoir: args.reservoir

                });
                return tank.save();
            }
        },

        createTankRecord: {
            type: TankRecordType,
            args: {

                tankId: { type: new GraphQLNonNull(GraphQLID) },
                recordType: { type: new GraphQLNonNull(GraphQLString) },
                amount: { type: new GraphQLNonNull(GraphQLFloat) },
                realBalance: { type: new GraphQLNonNull(GraphQLFloat) },
                date: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let tankRecord = new TankRecord({

                    tankId: args.tankId,
                    recordType: args.recordType,
                    inhandBalance: 250,
                    amount: args.amount,
                    expectedBalance: 525,
                    realBalance: args.realBalance,
                    pricePerUnit: 25,
                    commission: 4264,
                    date: args.date

                });
                return tankRecord.save();
            }
        },
        createPump: {
            type: PumpType,
            args: {

                tankId: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let pump = new Pump({

                    tankId: args.tankId,
                    name: args.name,

                });
                return pump.save();
            }
        },
        createMeterReading: {
            type: MeterReadingType,
            args: {

                pumpId: { type: new GraphQLNonNull(GraphQLID) },
                reading: { type: new GraphQLNonNull(GraphQLFloat) },
                date: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let meterReading = new MeterReading({

                    pumpId: args.pumpId,
                    reading: args.reading,
                    date: args.date,

                });
                return meterReading.save();
            }
        },
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

