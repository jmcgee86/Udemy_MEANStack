var mongoose = require ('mongoose');
var Hotel = mongoose.model('Hotel');


//GET all reviews for a hotel
module.exports.reviewsGetAll = function(req,res){
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);
    
    Hotel
    .findById(hotelId)
    .select('reviews')//only returns reviews instead of all the hotel data
    .exec(function(err, doc){
        if (err){
            console.log("error finding hotel")
            res
                .status(500)
                .json(err);
        }else if(!doc){
            console.log("hotel id of " + hotelId + " not found in database")
            res
                .status(404)
                .json({
                    "message": "hotel id of " + hotelId + " not found"
                });
        }else{
        console.log("Returned doc", doc)
        res
            .status(200)
            .json(doc.reviews);
        }
    });
};

//GET single review for a hotel
module.exports.reviewsGetOne = function(req,res){
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);
    var reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + "for hotelId " + hotelId);
    
    Hotel
    .findById(hotelId)
    .select('reviews')//only returns reviews instead of all the hotel data
    .exec(function(err, hotel){
        var response = {
            status: 200,
            message: {}
        };
        if (err){
            console.log("error finding hotel")
            response.status = 500;
            response.message = err;
        }else if(!hotel){
            console.log("hotel id not found in database", hotelId)
            response.status = 404;
            response.message = {
                    "message": "hotel id of " + hotelId +  "notfound"
                };
        }else{
        response.message = hotel.reviews.id(reviewId);
        if (!response.message){
            response.status = 404;
            response.message ={
                    "message": "review ID of " + reviewId + " not found"
                };
            }
        }
        res
            .status(response.status)
            .json(response.message);
         
    });
};

var _addReview = function (req, res, hotel){
    
    hotel.reviews.push({
        name: req.body.name,
        rating: parseInt(req.body.rating, 10),
        review: req.body.review
    });
    
    hotel.save(function(err, hotelUpdated){
        if (err){
            res
                .status(500)
                .json(err);
        }else{
            res
                .status(201)
                .json(hotelUpdated.reviews[hotelUpdated.reviews.length -1]);
        };
            
    });
    
};

module.exports.reviewsAddOne = function (req,res){
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);

    Hotel    
    .findById(hotelId)
    .select('reviews')//only returns reviews instead of all the hotel data
    .exec(function(err, doc){
        if (err){
            console.log("error finding hotel")
            res
                .status(500)
                .json(err);
        }else if(!doc){
            console.log("hotel id of " + hotelId + " not found in database")
            res
                .status(404)
                .json({
                    "message": "hotel id of " + hotelId + " not found"
                });
        }if (doc){
            _addReview(req,res,doc)
        }
    });
};

module.exports.reviewsUpdateOne = function (req, res){
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);
    var reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + "for hotelId " + hotelId);
    
    Hotel
        .findById(hotelId)
        .select('reviews')//only returns reviews instead of all the hotel data
        .exec(function(err, hotel){
            var response = {
                status: 200,
                message: {}
            };
            if (err){
                console.log("error finding hotel")
                response.status = 500;
                response.message = err;
            }else if(!hotel){
                console.log("hotel id not found in database", hotelId)
                response.status = 404;
                response.message = {
                        "message": "hotel id of " + hotelId +  "notfound"
                    };
            }else{
            response.message = hotel.reviews.id(reviewId);
            if (!response.message){
                response.status = 404;
                response.message ={
                        "message": "review ID of " + reviewId + " not found"
                    };
                }
            }if(response.status != 200){
                    res
                        .status(response.status)
                        .json(response.message);
                }else{
                    console.log("trying to add the updated data");
                    response.message.name = req.body.name;
                    response.message.rating = parseInt(req.body.rating,10);
                    response.message.review = req.body.review;
                
                 hotel.save(function(err, reviewUpdated){
                    if(err){
                        res
                            .status(500)
                            .json(err);
                    }else{
                        console.log('tried to update', reviewUpdated);
                        res
                            .status(204)
                            .json(reviewUpdated);
                    }
                });
                };
             
        });
};

module.exports.reviewsDeleteOne = function (req, res){
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);
    var reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + "for hotelId " + hotelId);
    
    Hotel
        .findById(hotelId)
        .select('reviews')//only returns reviews instead of all the hotel data
        .exec(function(err, hotel){
            var response = {
                status: 200,
                message: {}
            };
            if (err){
                console.log("error finding hotel")
                response.status = 500;
                response.message = err;
            }else if(!hotel){
                console.log("hotel id not found in database", hotelId)
                response.status = 404;
                response.message = {
                        "message": "hotel id of " + hotelId +  "notfound"
                    };
            }else{
            response.message = hotel.reviews.id(reviewId);
            if (!response.message){
                response.status = 404;
                response.message ={
                        "message": "review ID of " + reviewId + " not found"
                    };
                }
            }if(response.status != 200){
                    res
                        .status(response.status)
                        .json(response.message);
                }else{
                hotel.reviews.id(reviewId).remove();
                 hotel.save(function(err, reviewUpdated){
                    if(err){
                        res
                            .status(500)
                            .json(err);
                    }else{
                        console.log('tried to update', reviewUpdated);
                        res
                            .status(204)
                            .json(reviewUpdated);
                    }
                });
                };
             
        });
    
};