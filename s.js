const loader = document.querySelector("#loading");
const base_url = "https://script.google.com/macros/s/AKfycbxvZk6Wxi0TAUH8x6oBmTxO6vXhNoIbSpVoL2LdsanF6PjSiN-czA6j712Yzs50fVfgig/exec";
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}
function hideLoading() {
    loader.classList.remove("display");
}

//function to filter students based on company
function filterStudents() {
    student_container.innerHTML = "";
    if(document.querySelector("#company").value == "ALL"){
        fetchStudents();
    }
        
    displayLoading();
    //clear the student container
    
    const company = document.querySelector("#company").value;
    
    const url = `${base_url}?company=${company}`;
    fetch(url)
        .then(response => response.json())
        .then(characters => showCharacters(characters.data));

    showCharacters = characters => {
        characters.forEach(student => {
            const StudentDiv = document.createElement('div');
            StudentDiv.classList.add('student');

            const StudentInnerHTML = `
            <div class="info">
                
                <h3 class="name">${student.Name}</h3>
                <p class="email">${student.Company}</p>
                <p class="email">${student.Salary}LPA</p>
               
            </div>
        `;
            StudentDiv.innerHTML = StudentDiv.innerHTML + StudentInnerHTML;

            student_container.appendChild(StudentDiv);
        });
        hideLoading();
    }
}
displayLoading();
const fetchStudents = async () => {

   fetch(base_url)
    .then(response => response.json())
    
    .then(characters => showCharacters(characters.data));
    
    showCharacters = characters => {
            characters.forEach(student => {
                if(student.Company != "Company"&& student.Company != ""){
                //add company name to the dropdown and remove duplicates
                const company = document.querySelector("#company");
                const option = document.createElement("option");
                option.value = student.Company;
                option.textContent = student.Company;
                company.appendChild(option);
                //remove duplicates
                const options = Array.from(document.querySelectorAll("#company option"));
                const uniqueOptions = [...new Set(options.map(option => option.value))];
                company.innerHTML = "";
                uniqueOptions.forEach(uniqueOption => {
                    const option = document.createElement("option");
                    option.value = uniqueOption;
                    option.textContent = uniqueOption;
                    company.appendChild(option);
                });
            }
                
                if(student.Name!="Name"&& student.Name!=""){
                const StudentDiv = document.createElement('div');    
                StudentDiv.classList.add('student');
            
            const StudentInnerHTML = `
            <div class="info">
                
                <h3 class="name">${student.Name}</h3>
                <p class="email">${student.Company}</p>
                <p class="email">${student.Salary}LPA</p>
               
            </div>
        `;
        StudentDiv.innerHTML = StudentDiv.innerHTML + StudentInnerHTML;
    
        student_container.appendChild(StudentDiv); 
    }
   
    });
    hideLoading();
    };
        // });
    
}
fetchStudents();