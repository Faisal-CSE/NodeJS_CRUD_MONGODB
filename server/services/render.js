exports.homeRoutes = (req,res)=>{
    res.render('index');
};

exports.addUserRoutes = (req,res)=>{
    res.render('add_user');
};

exports.updateUserRoutes = (req,res)=>{
    res.render('update_user');
};