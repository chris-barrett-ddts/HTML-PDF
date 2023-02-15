# HTML - PDF

A prototype that allows the user to download a PDF version of their answers at the end.

This prototype is dependant on an extra package html-pdf-node you can install this by "npm i html-pdf-node".

The function in the routes file generates and downloads the PDF.

You can set the page to be downloaded by using the path attribute.

You can then call that function on form submission as per the button below.

You can also use the layout to create a custom print layout.

I've also added a media query in application.scss to stop the URL being printed out after the links on the PDF.
