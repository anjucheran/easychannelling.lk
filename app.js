var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    Centre = require("./models/centre"),
    Admin = require("./models/admin"),
    Doctor = require("./models/doctor"),
    Operator = require("./models/operator"),
    Owner = require("./models/owner"),
    Patient = require("./models/patient"),
    types = {"Admin": Admin, "Doctor": Doctor, "Operator": Operator, "Channelling Centre Owner": Owner, "Normal User": Patient},
    app = express();
    
mongoose.connect("mongodb://localhost/easy-channelling");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", function(req, res){
    res.render("index", {err: 0});
});

app.post("/user", function(req, res){
    var user = new User();
    user.username = req.body.email;
    user.password = req.body.password;
    user.usertype = req.body.usertype;
    
    var type = req.body.usertype;
    var x = types[""+type];
    
    var specUser = new x();
    specUser.name = req.body.name;
    specUser.contact = req.body.contact;
    
    user.save();
    specUser.user = user._id;
    
    specUser.save();
    
    console.log(user._id);
    console.log(specUser);
    
    res.redirect("/user/edit/"+ type + "/" + specUser._id );
});

app.get("/user/:type/:id", function(req, res){
    var id = req.params.id;
    var commands = {
        "Channelling Centre Owner": [["Add Channelling Centre", "/"+id+"/centre/new"], ["Channelling Centres", "/"+id+"/centre/"]],
        "Doctor": []
    };
    var type = req.params.type;
    var user = types[type];
    user.findById(id).populate("user").exec(function(err, user){
        if(err){
            console.log(err);
        }else{
            res.render("profile", {user: user, commands: commands[type], type: type});
        }
    });
});

app.get("/:id/centre/new", function(req, res){
    res.render("addCentre",{id: req.params.id});
});

app.post("/:id/centre", function(req, res){
    var centre = new Centre();
    var id = req.params.id;
    centre.name = req.body.name;
    centre.SLMAnum = req.body.SLMAnum;
    centre.address = req.body.address;
    centre.contact = req.body.contact;
    
    centre.save();
    
    Owner.findById(req.params.id, function(err, owner){
        if(err){
            console.log(err);
        }else{
            owner.centres.push(centre._id);
            owner.save(function(err, user){
                if(err){
                    console.log(err);
                }else{
                    console.log(user);
                    res.redirect("/"+id+"/centre");
                }
            });
        }
    });
});

app.get("/:id/centre", function(req, res){
    Owner.findById(req.params.id).populate("centres").exec(function(err, owner){
        if(err){
            console.log(err);
        }else{
            res.render("centre",{cntrs: owner.centres, id: req.params.id});
        }
    });
});

app.post("/", function(req,res){
    var username = req.body.email2;
    var password = req.body.password2;
    User.findOne({username: username}, function(err, user){
        if(err){
            console.log(err);
            res.render("index", {err: 1});
        }else{
            console.log(user);
            if(password!=user.password){
                res.render("index", {err: 2});
            }else{
                var type = user.usertype;
                var specUser = types[type];
                specUser.findOne({user: user._id}, function(err, spec){
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect("/user/"+type+"/"+spec.id);
                    }
                });
            }
        }
    });
});

app.get("/centre", function(req,res){
    Centre.find({}, function(err, centres){
        if(err){
            console.log(err);
        }else{
            res.render("allCentres", {centres: centres});
        }
    });
});

app.get("/centre/doctor/new", function(req, res){
    res.render("addDoctor");
});

app.get("/user/edit/:type/:id", function(req, res){
    var id = req.params.id;
    var type = req.params.type;
    var user = types[type];
    user.findById(id).populate("user").exec(function(err, user){
        if(err){
            console.log(err);
        }else{
            if(type=="Doctor"){
                res.render("editDoctor", {user: user});
            }else{
                res.render("editProfile", {user: user, type: type});
            }
        }
    });
});

app.post("/user/:type/:id", function(req, res){
    var birthday = req.body.birthday;
    var gender = req.body.gender;
    var nic = req.body.nic;
    var address = req.body.address;
    var id = req.params.id;
    var type = req.params.type;
    if(type=="Doctor"){
        var slmareg = req.body.slmareg;
        var category = req.body.category;
        Doctor.findById(id, function(err, doctor){
            if(err){
                console.log(err);
            }else{
                doctor.birthday = birthday;
                doctor.gender = gender;
                doctor.nic = nic;
                doctor.address = address;
                doctor.slmareg = slmareg;
                doctor.category =category;
                doctor.save();
                res.redirect("/user/Doctor/"+id);
            }
        });
    }else{
        var specUser = types[type];
        specUser.findById(id, function(err, user){
            if(err){
                console.log(err);
            }else{
                user.birthday = birthday;
                user.gender = gender;
                user.nic = nic;
                user.address = address;
                user.save();
                res.redirect("/user/"+type+"/"+id);
            }
        });
    }
});

app.get("/doctor", function(req,res){
    Doctor.find({}, function(err, doctors){
        if(err){
            console.log(err);
        }else{
            res.render("allDoctors", {doctors: doctors});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
     console.log("Server is runnig!");
});