const { User, Challenge, UsersNumber, Articles} = require('./db');
const vm = require('node:vm');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Yahiamahmoood333@gmail.com',
    pass: 'www$@WWW'
  }
});

const getAllChallenges = (req, res) => {
    const { skip, hardness } = req.query;
    Challenge.find()
        .limit(20)
        .skip(parseInt(skip))
        .where("type")
        .equals(hardness)
        .select("name type")
        .then(challenges => res.json(challenges))
        .catch(err => res.status(400).json(`error: ${err}`));        
}

const addChallenge = (req, res) => {
    const { name, description, type, testing, solution, forbidden, funcName, img } = req.body;

    const newChallenge = new Challenge({
        name,
        description,
        type,
        testing,
        solution,
        forbidden,
        funcName,
        img
    });

    newChallenge.save()
    .then(() => res.send("new challenge added !"))
    .catch(err => res.status(400).json(`error: ${err}`));
}


const getSingleChallenge = (req, res) => {
    const { id } = req.params;
    Challenge.findById(id)
        .then(challenges => res.json(challenges))
        .catch(err => res.status(400).json(`error: ${err}`));
}

const peoplePassed = (req, res) => {
    const { points, challengeName } = req.body;
    
    User.findById(req.params.id)
        .then(users => {
            users.passedChallenges = [...users.passedChallenges, challengeName];
            users.points = parseInt(users.points) + parseInt(points);

            users.save()
                .then(() => res.json("some one passed this challenge"))
                .catch(err => res.status(400).json(`error: ${err}`));
        })
        .catch(err => res.status(400).json(`error: ${err}`));
}

const increase = (req, res) => {
    
    Challenge.findById(req.params.id)
    .then(challenges => {
        challenges.peoplePassed = challenges.peoplePassed + 1;
        
        challenges.save()
        .then(() => res.json("some one passed this challenge"))
        .catch(err => res.json(`error: ${err}`));
    })
        .catch(err => res.status(400).json(`error: ${err}`));
}

const addNewUser = (req, res) => {
    const { userName, email, img, password } = req.body;

    var points = 0;
                
    const newUser = new User({
        userName,
        email,
        img,
        password,
        points
    });
    newUser.save()
    .then(() => res.send("new user added !"))
        .catch(err => res.status(400).json(err));
    
    // increase user number
    UsersNumber.findById("62a209c79dba48adcd0e4b00")
    .then(usersNum => {
        usersNum.num = usersNum.num + 1;
        
        usersNum.save()
    })
        .catch(err => res.status(400).json(`error: ${err}`));
}

const getSingleUser = (req, res) => {
    const { userName, password } = req.body;

    User.where("userName").equals(userName)
        .where("password").equals(password).limit(1)
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err));
    
}

const getTops = (req, res) => {

    User.find({})
        .limit(50)
        .sort({ "points": -1 })
        .select("userName points")
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));
}

const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(res => res.status(200).send(res))
        .catch(err => res.status(400).json(err));        
}

const editChallenge = (req, res) => {
    const { name, description, type, testing, solution, forbidden, funcName, img } = req.body;

    Challenge.findById(req.params.id)
        .then(challenge => {
            challenge.name = name;
            challenge.description = description;
            challenge.type = type;
            challenge.testing = testing;
            challenge.solution = solution;
            challenge.forbidden = forbidden;
            challenge.funcName = funcName;
            challenge.img = img;

            challenge.save()
                .then(() => res.json("challenge updated!"))
                .catch(err => res.status(400).json("Error:" + err));
        })
        .catch(err => res.status(400).json("Error:" + err));
}

const deleteChallenge = (req, res) => {
    Challenge.findByIdAndDelete(req.params.id)
        .then(() => res.json("challenge deleted!"))
        .catch(err => res.status(400).json("Error:" + err));
}


// 62a209c79dba48adcd0e4b00 ==> id
const getUsersNum = (req, res) => {
    UsersNumber.findById("62a209c79dba48adcd0e4b00")
        .then(usersNum => res.json(usersNum.num))
        .catch(err => res.status(400).json(err)); 
}

// test user function and send results
const testFunc = (req, res) => {
    const { id } = req.params;
    const { func } = req.body;

    Challenge.findById(id)
        .select("testing forbidden")
        .then(challenges => {
            const script = new vm.Script(`func = ${func}; test = ${challenges.testing}`);
        
            let compiled = [];
        
            script.runInNewContext(compiled);
        
            let finalArr = compiled.test.map((obj, index) => {
              try {
                return { 
                    yourResult: `*${compiled.func(...obj.input)}*`,
                    expectedResult: `*${obj.result[0]}*`,
                    case: compiled.func(...obj.input) === obj.result[0]
                };
              } catch (err) {
                  return {
                      yourResult: `${new Error(err.toString())}`,
                      expectedResult: `*${obj.result[0]}*`,
                      case: compiled.func(...obj.input) === obj.result[0]
                  };
              }
            });

            if (challenges.forbidden.length > 0) {
                challenges.forbidden.forEach((a, index) => {
                    if (func.includes(a)) {
                        finalArr.push(`your code shouldn’t contain ${a}`);
                    }
                })
            }

            console.log(finalArr);
            res.json(finalArr);
        })
        .catch(err => {
            res.json(err);
        });

}

const getAllArticles = (req, res) => {
    const { skip } = req.query;
    Articles.find()
        .limit(20)
        .skip(parseInt(skip))
        .select("title keyWords numOfPeople")
        .then(articles => res.json(articles))
        .catch(err => res.status(400).json(`error: ${err}`)); 
}

const getSingleArticle = (req, res) => {
    const { id } = req.params;
    Articles.findById(id)
        .then(article => res.json(article))
        .catch(err => res.status(400).json(`error: ${err}`));    
}

const updateArticle = (req, res) => {
    const { title, body, keyWords } = req.body;

    Articles.findById(req.params.id)
        .then(article => {
            article.title = title,
            article.body = body,
            article.keyWords = keyWords,
            article.updated = () => new Date().toLocaleString(),

            article.save()
                .then(() => res.json("article updated!"))
                .catch(err => res.status(400).json("Error:" + err));
        })
        .catch(err => res.status(400).json("Error:" + err));    
}

const deleteArticle = (req, res) => {
    Articles.findByIdAndDelete(req.params.id)
        .then(() => res.json("article deleted!"))
        .catch(err => res.status(400).json("Error:" + err));    
}

const addNewArticle = (req, res) => {
    const { title, body, keyWords } = req.body;

    const newArticle = new Articles({
        title,
        body,
        keyWords,
    });

    newArticle.save()
    .then(() => res.send("new article added !"))
    .catch(err => res.status(400).json(`error: ${err}`));    
}

const articleSee = (req, res) => {
    Articles.findById(req.params.id)
        .then(article => {
            article.numOfPeople = article.numOfPeople + 1
                
            article.save()
                .then(() => res.json("someone saw this article!"))
                .catch(err => res.status(400).json("Error:" + err));
        })
        .catch(err => res.status(400).json("Error:" + err));      
}

const sendEmail = (req, res) => {
    var mailOptions = {
        from: 'Yahiamahmoood333@gmail.com',
        to: 'Yahiamahmoud75@gmail.com',
        subject: 'تأكيد الرمز',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.send(error);
        } else {
            res.send('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    getAllChallenges,
    addChallenge,
    getSingleChallenge,
    peoplePassed,
    addNewUser,
    getSingleUser,
    increase,
    getTops,
    deleteUser,
    editChallenge,
    deleteChallenge,
    getUsersNum,
    testFunc,
    getSingleArticle,
    updateArticle,
    deleteArticle,
    addNewArticle,
    articleSee,
    getAllArticles,
    sendEmail
};