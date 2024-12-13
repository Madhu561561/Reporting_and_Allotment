const express = require('express');
// const studata = require('../models/studata');
const router = express.Router();
const csv = require("csvtojson");
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const userController = require('../controllers/userController');
const allocateController = require('../controllers/allocateController');
const fs = require('fs');
const fastcsv = require('fast-csv');
const studata = require('../models/studata');
const upload = multer({ dest: 'uploads/' });



const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (!fs.existsSync("others")) {
      fs.mkdirSync("others")
    }
if (!fs.existsSync("others/uploads")) {
  fs.mkdirSync("others/uploads")
}
cb(null, "others/uploads")

  }, 
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
});

// const upload = multer({
//   storage: storage,
//   fileFilter: function(req, file, cb) {
//     var ext = path.extname(file.originalname);

//     if(ext !== ".csv") {
//       return cb(new Error("only csv files are allowed!"));

//     }
//     cb(null, true);
//   },
// });
      
// const router = express.Router()

router.post("/created", upload.single('csvFile'),userController.create);



router.get('/exportUser',userController.exportUser);
router.get('/allocated',allocateController.allocate);
// router.get('/exportRooms',userController.exportRooms); 

router.get('/all/stud', async (req, res) => {
  try {
    const allst = await studata.find().sort({semester:-1, paymentdate:-1});
    res.status(200).json(allst)
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error')
  }
})

// Route to download all student data in CSV format
// router.get('/download-csv', async (req, res) => {
//   try {
//     const allst = await studata.find();

//     const filename = 'student_data.csv';
//     const csvStream = fastcsv.format({ headers: true });

//     // Pipe the CSV data into the response
//     res.setHeader('Content-disposition', 'attachment; filename=' + filename);
//     res.setHeader('Content-Type', 'text/csv');
//     csvStream.pipe(res);

//     // Transform each student object into a flat array of values
//     const csvData = allst.map((student) => [
//       // student.id,
//       student.name,
//       student.paymentid,
//       // student.date,
//       // Add more fields here as needed
//     ]);

//     // Write the CSV data to the stream
//     csvData.forEach((row) => csvStream.write(row));

//     // End the CSV stream
//     csvStream.end();
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json('Server Error');
//   }
// });
router.get('/newstud/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const student = await studata.findById(_id);

    if (!student) {
      res.status(404).json({
        status: "FAILED",
        message: "Student not found",
        data: null
      });
    } else {
      res.json({
        status: "success",
        message: "Student details retrieved successfully",
        data: student
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message
    });
  }
});
//add student 
router.post("/newstud", async(req, res) => {
  console.log(req.body);
  const data = new studata(req.body)
  const result = await data.save()
  if(!result) {
    res.json({
      status: "failed",
        message: "failed to add student"
    })
  }
  else {
    res.json({
      status: "success",
        message: "student added successfully",
        data: result
    })
  }
})

//update table of student data
router.put('/newstud/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await studata.findByIdAndUpdate(_id, req.body,{new: true})
    console.log(result);
    if (!result) {
      res.json({
        status: "FAILED",
        message: "updation fail",
        data: result
      })
    }
    else {
      res.json({
        status: "success",
        message: "updated successfully",
        data: result
      })
    }
  } catch (e) {
    res.send(e)
  }
})


//delete students record
router.delete('/all/newstud/:id', async (req,res) => {
  try {
    const _id = req.params.id;
    const result = await studata.findByIdAndDelete(_id);
    if(!result) {
      res.json({
        status: "success",
        message: "deleted successfully"
      })
    }
    else {
      res.json ({
        status: "failed",
        message: "failed to delete"
      })
    }
  } catch (e) {
    res.send(e)
  }
})
// const upload = multer({ dest: 'uploads/' });
// Route to handle the CSV file upload
// Update the key in the upload.single() middleware to match the file input name attribute.
// router.post('/upload', upload.single('csvFile'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   const fileStream = fs.createReadStream(req.file.path);
//   const data = [];

//   // Parse the CSV file using fast-csv
//   fastcsv
//     .parseStream(fileStream, { headers: true })
//     .on('data', (row) => {
//       data.push(row);
//     })
//     .on('end', async () => {
//       // Remove the temporary file after parsing
//       fs.unlinkSync(req.file.path);

//       try {
//         // Save the parsed data to the database
//         await studata.insertMany(data);

//         // Handle the parsed data as needed
//         console.log('Parsed data:', data);

//         res.status(200).json({ message: 'File uploaded and data saved to the database' });
//       } catch (error) {
//         console.log(error.message);
//         res.status(500).json('Server Error');
//       }
//     });
// });



module.exports = router;