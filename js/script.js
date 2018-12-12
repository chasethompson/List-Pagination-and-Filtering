// Treehouse Techdegree: FSJS project 2 

// This will wait to execute the JS until page content loads
document.addEventListener('DOMContentLoaded', () => {

   // Global variables that reference, manipulate, and traverse the DOM
      const students = document.querySelectorAll('.student-item');
      const studentDetails = document.querySelectorAll('.student-details');
      const pageDiv = document.querySelector('.page');
      const pageHeader = document.querySelector('.page-header');
      const studentsPerPage = 10;
      let pageNumber = 1;

      // Create Search field and button
      const searchDiv = document.createElement('div');
      const searchInput = document.createElement('input');
      const searchButton = document.createElement('button');
      let results = []; //Array to contain students found
      let error = document.createElement('p');
      let errorImg = document.createElement('img');
      errorImg.src = "https://i.kym-cdn.com/entries/icons/square/000/004/687/mario-princess-another-castle.png"

      // Add search field attributes and append to page
      searchDiv.className = 'student-search';
      searchInput.placeholder = 'Search for student(s)';
      searchButton.textContent = 'Search';
      pageHeader.appendChild(searchDiv);
      searchDiv.appendChild(searchInput);
      searchDiv.appendChild(searchButton);
      error.className = 'error';
      error.textContent = '';
      pageDiv.appendChild(error);

      // Create showPage function
      const showPage = (list, page) => {
      // firstStudent and lastStudent will be used to reference beginning and ending of new pages
      let firstStudent = (page*10) - 10;
      let lastStudent = (page*10) - 1;
      for (let i = 0; i < list.length; i++ ) {
         if (i >= firstStudent && i <= lastStudent) {
            list[i].style.display = 'block';
         } else {
            list[i].style.display = 'none';
         }
      }
      }

      showPage(students, pageNumber);

      // Create appendPageLinks function
      const appendPageLinks = (list) => {
      // Remove pagination if any exist
      if (document.querySelector('.pagination') !== null) {
         let removeDiv = document.querySelector('.pagination');
         pageDiv.removeChild(removeDiv);
      }
      // Find total number of pages needed
      let totalPages = Math.ceil(list.length / studentsPerPage);
      //Create  and append pageLinks
      const paginationDiv = document.createElement('div');
      paginationDiv.className = 'pagination';
      pageDiv.appendChild(paginationDiv);
      // Create and append ul
      let ul = document.createElement('ul');
      paginationDiv.appendChild(ul);
      // Create li per page
      for (let i = 0; i < totalPages; i ++) {
         let li = document.createElement('li');
         let a = document.createElement('a');
         a.textContent = i + 1;
         ul.appendChild(li);
         li.appendChild(a);
      }
      // Create 'active' class for clicked page
      if (list.length > 0) {
         let a = document.querySelectorAll('a');
         a[0].className = 'active';
      }
      // Event listener to display students for active page
      paginationDiv.addEventListener('click', (event) => {
         if (event.target.tagName == 'A') {
            pageNumber = parseInt(event.target.textContent);
            showPage(list, pageNumber);
            let a = document.querySelectorAll('a');
            for (let i = 0; i < totalPages; i++ ) {
            a[i].classList.remove('active');
            }
            event.target.className = 'active';
         }
      });
      }

      appendPageLinks(students);

      // Create search function
      const search = (results, students, studentDetails) => {
      results = [];
      // Append students to 'result array' that match and hide those that do not match
      for (let i = 0; i < students.length; i++ ) {
         if (studentDetails[i].textContent.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1) {
            results.push(students[i]);
            students[i].style.display = 'block';
         } else {
            students[i].style.display = 'none';
         }
      }
      // Display a message if no student matches are found
      if (searchInput.value !== null && results.length === 0) {
         error.textContent = 'Thank you for searching. But your student is in another castle!';
         // Add fun image to no match message
         const errorImg = document.createElement('img');
         errorImg.src = "https://i.kym-cdn.com/entries/icons/square/000/004/687/mario-princess-another-castle.png"
         errorImg.style.height = '300px';
         errorImg.style.width = '300px';
         pageDiv.appendChild(errorImg);
      } else {
         error.textContent = '';
         }
      // Append pagination to search results
      pageNumber = 1;
      showPage(results, pageNumber);
      appendPageLinks(results);
      }

      // Event listener for search field
      searchInput.addEventListener('keyup', () => {
      search(results, students, studentDetails);
      });


      // Event listener for search button
      searchButton.addEventListener('click', () => {
      search(results, students, studentDetails);
      });
});