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
            type: new GraphQLNonNull( new GraphQLList(PriceListType))
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
            type: new GraphQLNonNull( new GraphQLList(ItemListType))
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
            args:{_id:{type: new GraphQLNonNull(GraphQLID)}},

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
        creditOtherSale: {
            type: new GraphQLNonNull(GraphQLList(CreditOtherSaleType)),

            resolve(parent, args) { //Grab Data
                return CreditOtherSale.find({});
            }
        },

        fuelType: {
            type: new GraphQLNonNull(GraphQLList(FuelTypeType)),

            resolve(parent, args) { //Grab Data
                return FuelType.find({});
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
                    total:10,
                    invoiceNo:"dgergerg"
                });
                return creditOtherSale.save();

            }
        },

        createCreditPaymentlType: {
            type: CreditPaymentType,
            args: {

                creditCustomerId: { type: new GraphQLNonNull(GraphQLID) },
                paidAmount: { type: new GraphQLNonNull(GraphQLFloat)},
                paymentType: { type: new GraphQLNonNull(GraphQLString)},
                chequeNo: { type: GraphQLString},
                date: { type: new GraphQLNonNull(GraphQLString)}
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
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});


