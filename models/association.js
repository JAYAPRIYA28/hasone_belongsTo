module.exports = (sequelize, DataTypes) => {
    const customerContent = sequelize.define( "customerContent", {
        name: {
            type: DataTypes.STRING,
          
        },
    },{
        timestamps:false
    });

    const productContent = sequelize.define( "productContent", {
        name: {
            type: DataTypes.STRING,
        
        }, 
    },{
        timestamps: false
    });

    const customerProduct = sequelize.define('customerproduct', {
        customerproductId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        timestamps: false
    })




    customerContent.belongsToMany( productContent, {through: customerProduct});
    productContent.belongsToMany(customerContent, {through: customerProduct});



    let Customer;
    let Product;
    sequelize.sync( {alter : true}).then( () => {

        // customerContent.bulkCreate([
        //     {
        //         name: 'jaii'
        //     },
        //     {
        //         name: 'lara'
        //     },
        //     {
        //         name: 'kavin'
        //     },
        //     {
        //         name: 'thara'
        //     }
        // ]);
 
        // productContent.bulkCreate([
        //     {
        //         name: 'laptop'
        //     },
        //     {
        //         name: 'mobile'
        //     },
        //     {
        //        name: 'tab'
        //     },
        //     {
        //        name: 'earphone'
        //     }
        // ])
       
        return customerContent.findOne( { where: {name : 'jaii'}});

      
    })
    .then((data) => {
        Customer = data;
        return productContent.findAll();
    }).then((data)=> {
        Product = data;
        Customer.addProductContents(Product);
    })
    .catch((err)=> {
        console.log(err);
    })

    return customerContent, productContent;

}