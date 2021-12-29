module.exports = (sequelize, DataTypes) => {
    const country = sequelize.define("country", {
        countryName: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        timestamps: false
    });

    const capital = sequelize.define("capital", {
        capitalName: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        timestamps: false
    });


    country.hasOne(capital);
    capital.belongsTo(country);

    let Country, Capital;

    sequelize.sync( {alter:true}).then(()=> {
        return country.findOne( {where: {countryName: 'italy'}});

    }).then((data)=> {
        Country = data;
        return capital.findOne({where: {capitalName: 'london'}});
    })
    .then((data)=> {
        Capital = data;
        return Capital.setCountry(Country);
    }).then((data)=> {
        console.log(data);
    })
    .catch((err)=> {
        console.log(err)
    })

    return country, capital;
}


