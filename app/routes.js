const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

//variables for the file name and HTML template to use
let fileName = "myPDF"
let templateHTML = "template.html"

//Function for generating and downloading the PDF
function generatePDF(req,res){

var html_to_pdf = require('html-pdf-node');

let options = { path: 'public/images/pdfs/' + fileName + '.pdf', printBackground: true, format: "A3" };
// Example of options with args printBackground: true, displayHeaderFooter: true, preferCSSPageSize: true,
// args: ['--window-size=1920,1080', '--no-sandbox', '--disable-setuid-sandbox', '--enable-viewport', '--desktop-window-1080p'] //

let file = [{ url: req.protocol + '://' + req.get('host') + "/templates/" + templateHTML, name: fileName + '.pdf' }];

html_to_pdf.generatePdfs(file, options).then(output => {
  console.log("PDF Buffer:-", output); // PDF Buffer:- [{url: "https://example.com", name: "example.pdf", buffer: <PDF buffer>}]
  console.log('completed')

          //download PDF
          console.log('downloading PDF...')
          res.download('public/images/pdfs/' + fileName + '.pdf'), function (err) {

              console.log(err);

          };

          console.log('completed')
        });

};



//Route for generating the PDF
router.get('/generatePDF', function (req, res) {

  console.log('generating PDF...')
  fileName = "myAnswers"
  templateHTML = "pdf-template.html"
  generatePDF(req,res)

})


//----------------------------------------------------------//
//EXAMPLE FLOW//

//Enter a name
router.get('/add-a-contact/enter-a-name', function(req, res) {
  //set back to the previous page
  req.session.data.back = req.headers.referer
  res.render('add-a-contact/enter-a-name');
});

router.post('/add-a-contact/enter-a-name', function(req, res) {

  //If the user has come from check-you-answers then redirect back to that page, else continue to enter an email
  if (req.session.data['back'].includes("check-your-answers")) {
    res.redirect('/add-a-contact/check-your-answers');
  } else {
    res.redirect('/add-a-contact/enter-an-email');
  }

});



//Enter an email
router.get('/add-a-contact/enter-an-email', function(req, res) {
  res.render('add-a-contact/enter-an-email');
});

router.post('/add-a-contact/enter-an-email', function(req, res) {
  res.redirect('/add-a-contact/check-your-answers');
});


//Check your answers
router.get('/add-a-contact/check-your-answers', function(req, res) {
  res.render('add-a-contact/check-your-answers');
});

router.post('/add-a-contact/check-your-answers', function(req, res) {
  res.redirect('/add-a-contact/contact-set-up');
});


//Success - Contact set up
router.get('/add-a-contact/contact-set-up', function(req, res) {
  res.render('add-a-contact/contact-set-up');
});




//GENERATE PDF
router.get('/generateAppPDF', function (req, res) {

  // session data // these need to be passed as URL query parameters for it to work dynamically
  let name = req.session.data['name']
  let email = req.session.data['email']


  console.log('generating PDF...')
  fileName = name + "-application"
  templateHTML = "test-template.html?name="+name+"&email="+email
  generatePDF(req,res)

})





module.exports = router
