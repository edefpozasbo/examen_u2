var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/products");
var schemaProduct=mongoose.Schema({
    code:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    minimum:{
        type:Number,
        required:true,
        default:0
    }
});

var Product=mongoose.model("Product",schemaProduct,"product");

let product={
    code:102,
    price:12,
    description:"Arroz",
    quantity:1,
    minimum:5
};

function queryReorder(msg){
    Product.find({}).then(data=>{
        var reorder=[]
        for(var i=0;i<data.length;i++){
            var item=data[i];
            if(item.quantity<=item.minimum)
                reorder.push(item);
        }
        console.log(msg);
        console.log(reorder);
    }).catch(err=>{
        console.log(err);
        process.exit(1);
    });
}


Product.create(product).then(data=>{
    console.log("---------INGRESADO----------");
    console.log(data);
    queryReorder("--------CONSULTA TODOS PRODUCTOS A REORDER DESPUES DE INGRESO-----");
}).catch(err=>{
    console.log(err);
    process.exit(1);
});

queryReorder("--------CONSULTA TODOS PRODUCTOS A REORDER-----");
